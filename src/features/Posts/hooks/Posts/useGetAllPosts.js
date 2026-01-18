import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { GetPostsWithMeta } from "../../api/apiPosts";
import { supabase } from "../../../../services/supabase";
import getUserByID from "../../../../services/getUserByID";
import { isLikedByMe } from "../../api/apiLikes";

function useGetAllPostsInfinite(limit = 9, userId) {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["posts-infinite", userId],
    queryFn: ({ pageParam = 1 }) =>
      GetPostsWithMeta({ page: pageParam, limit, userId }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;

      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const channel = supabase
      .channel("posts-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        async (payload) => {
          if (!payload) return;

          if (payload.eventType === "INSERT") {
            const newPost = payload.new;
            const userData = await getUserByID(newPost.author_id);
            const postWithUser = { ...newPost, author: userData };

            queryClient.setQueryData(["posts-infinite", userId], (oldData) => {
              if (!oldData) return { pages: [[postWithUser]], pageParams: [1] };

              const firstPage = oldData.pages[0];
              return {
                ...oldData,
                pages: [
                  [postWithUser, ...firstPage],
                  ...oldData.pages.slice(1),
                ],
              };
            });
          }

          if (payload.eventType === "DELETE") {
            queryClient.setQueryData(["posts-infinite", userId], (oldData) => {
              if (!oldData) return { pages: [], pageParams: [] };

              const newPages = oldData.pages.map((page) =>
                page.filter((p) => p.id !== payload.old.id)
              );
              return { ...oldData, pages: newPages };
            });
          }

          if (payload.eventType === "UPDATE") {
            const updatedPost = payload.new;

            const oldData = queryClient.getQueryData([
              "posts-infinite",
              userId,
            ]);

            if (oldData) {
              const userData = await getUserByID(updatedPost.author_id);
              const likedByMe = await isLikedByMe(userId, updatedPost.id);

              const postWithUser = {
                ...updatedPost,
                author: userData,
                is_liked_by_me: likedByMe,
              };

              const newPages = oldData.pages.map((page) =>
                page.map((post) =>
                  post.id === postWithUser.id ? postWithUser : post
                )
              );

              queryClient.setQueryData(["posts-infinite", userId], {
                ...oldData,
                pages: newPages,
              });
            } else {
              // لو مش موجود في الـ cache، نعمل refetch
              queryClient.invalidateQueries(["posts-infinite", userId]);
            }
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient, userId]);

  const posts = useMemo(() => data?.pages.flat() || [], [data?.pages]);

  return {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}

export default useGetAllPostsInfinite;
