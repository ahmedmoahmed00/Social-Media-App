import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { supabase } from "../../../../services/supabase";
import { getMessages } from "../../api/apiChat";

function useGetMessages(userID, friendID, limit = 7) {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["messages", userID, friendID],
    queryFn: ({ pageParam = 1 }) =>
      getMessages({ userID, friendID, page: pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < limit) return undefined;
      return allPages.length + 1;
    },
    enabled: !!userID && !!friendID,
  });

  useEffect(() => {
    const channel = supabase
      .channel(`messages-${userID}-${friendID}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `or(and(sender_id.eq.${userID},receiver_id.eq.${friendID}),and(sender_id.eq.${friendID},receiver_id.eq.${userID}))`,
        },
        (payload) => {
          const newMessage = payload.new;

          queryClient.setQueryData(
            ["messages", userID, friendID],
            (oldData) => {
              if (!oldData) return { pages: [[newMessage]], pageParams: [1] };

              const allMessages = oldData.pages.flat();
              const exists = allMessages.some(
                (msg) => msg.id === newMessage.id,
              );
              if (exists) return oldData;

              const updatedPages = [...oldData.pages];
              updatedPages[updatedPages.length - 1] = [
                ...updatedPages[updatedPages.length - 1],
                newMessage,
              ];

              return { ...oldData, pages: updatedPages };
            },
          );
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient, userID, friendID]);

  const messages = useMemo(() => {
    if (!data?.pages) return [];
    const uniqueMessages = new Map();

    data.pages.forEach((page) => {
      page.forEach((msg) => {
        uniqueMessages.set(msg.id, msg);
      });
    });

    return Array.from(uniqueMessages.values()).sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at),
    );
  }, [data?.pages]);

  return {
    dataMessages: messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}

export default useGetMessages;
