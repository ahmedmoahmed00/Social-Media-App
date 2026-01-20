import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFriends } from "../../api/apiFriends";
import { useEffect } from "react";
import { supabase } from "../../../../services/supabase";

function useGetUserFriends(userID) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["friends", userID],
    queryFn: () => getUserFriends(userID),
    enabled: !!userID,
  });

  useEffect(() => {
    const channel = supabase
      .channel("friends-message-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const newMessage = payload.new;

          if (
            newMessage.sender_id !== userID &&
            newMessage.receiver_id !== userID
          )
            return;

          queryClient.setQueryData(["friends", userID], (oldData) => {
            if (!oldData) return [];

            const updatedData = oldData.map((friend) => {
              const isRelevantFriend =
                friend.friend_id === newMessage.receiver_id ||
                friend.friend_id === newMessage.sender_id;

              if (isRelevantFriend) {
                return { ...friend, last_message: newMessage };
              }
              return friend;
            });

            return [...updatedData].sort((a, b) => {
              const timeA = new Date(a.last_message?.created_at || 0).getTime();
              const timeB = new Date(b.last_message?.created_at || 0).getTime();
              return timeB - timeA;
            });
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, userID]);
  return { data, isLoading, error };
}

export default useGetUserFriends;
