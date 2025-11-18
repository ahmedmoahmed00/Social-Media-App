import { useQuery } from "@tanstack/react-query";
import { notificationsFriends } from "../../api/notificationsFriends";

function useGetNotificationsFriends(receiverId) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["notificationsFriends", receiverId],
    queryFn: () => notificationsFriends(receiverId),
    enabled: !!receiverId,
  });

  return { data, error, isLoading };
}

export default useGetNotificationsFriends;
