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
        { event: "*", schema: "public", table: "messages" },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            const newMessage = payload.new;

            queryClient.setQueryData(["friends", userID], (oldData) => {
              if (!oldData) return [];

              return oldData.map((friend) => {
                if (
                  friend.friend_id === newMessage.receiver_id ||
                  friend.friend_id === newMessage.sender_id
                ) {
                  return { ...friend, last_message: newMessage };
                }
                return friend;
              });
            });
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient, userID]);

  return { data, isLoading, error };
}

export default useGetUserFriends;
