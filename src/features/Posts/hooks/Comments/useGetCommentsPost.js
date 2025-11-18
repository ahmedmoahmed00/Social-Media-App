import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getComments } from "../../api/apiComments";
import { useMemo } from "react";
import { useEffect } from "react";
import { supabase } from "../../../../services/supabase";
import getUserByID from "../../../../services/getUserByID";

function useGetCommentsPost(limit = 7, postId) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments-infinite", postId],
    queryFn: ({ pageParam = 1 }) =>
      getComments({ page: pageParam, limit, postId }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!postId,
  });
  useEffect(() => {
    const channel = supabase
      .channel("comments-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            const newComment = payload.new;
            const userData = await getUserByID(newComment.author_id);
            const commentWithUser = { author: userData, ...newComment };

            queryClient.setQueryData(
              ["comments-infinite", postId],

              (oldData) => {
                if (!oldData)
                  return { pages: [[commentWithUser]], pageParams: [] };

                return {
                  ...oldData,
                  pages: [
                    [commentWithUser, ...oldData.pages[0]],
                    ...oldData.pages.slice(1),
                  ],
                  pageParams: oldData.pageParams,
                };
              }
            );
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient, postId]);

  const comments = useMemo(() => data?.pages.flat() || [], [data?.pages]);

  return {
    comments,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export default useGetCommentsPost;
