import { useQuery } from "@tanstack/react-query";
import { getTrendingUsers } from "../../api/apiUsers";

function useGetTrendingUsers(userId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trending-users", userId],
    queryFn: () => getTrendingUsers(userId),
    enabled: !!userId,
  });

  return { data, isLoading, error };
}

export default useGetTrendingUsers;
