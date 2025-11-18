import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getPostsByID } from "../../api/apiPosts";
import { supabase } from "../../../../services/supabase";
import { useEffect } from "react";

function useGetPostsByID(userId, limit = 5) {
  const queryClient = useQueryClient();
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["postsProfile", userId],
    queryFn: ({ pageParam = 1 }) =>
      getPostsByID({ page: pageParam, limit, userId }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;

      return allPages.length + 1;
    },
    enabled: !!userId,
    staleTime: 0,
    select: (data) => data.pages.flat(),
  });

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("posts-user-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        (payload) => {
          if (payload.eventType === "DELETE") {
            queryClient.setQueryData(["postsProfile", userId], (oldData) => {
              if (!oldData) return { pages: [], pageParams: [] };

              const newPages = oldData.pages.map((page) =>
                page.filter((post) => post.id !== payload.old.id)
              );

              return { ...oldData, pages: newPages };
            });

            queryClient.setQueryData(["posts-infinite"], (oldData) => {
              if (!oldData) return { pages: [], pageParams: [] };

              const newPages = oldData.pages.map((page) =>
                page.filter((p) => p.id !== payload.old.id)
              );
              return { ...oldData, pages: newPages };
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, userId]);

  return {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}

export default useGetPostsByID;
