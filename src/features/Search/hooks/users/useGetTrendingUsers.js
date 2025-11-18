import { useQuery } from "@tanstack/react-query";
import { getTrendingUsers } from "../../api/apiUsers";

function useGetTrendingUsers() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trending-users"],
    queryFn: getTrendingUsers,
  });

  return { data, isLoading, error };
}

export default useGetTrendingUsers;
