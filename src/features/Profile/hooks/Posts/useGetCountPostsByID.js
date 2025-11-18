import { useQuery } from "@tanstack/react-query";
import { getCountPostsByID } from "../../api/apiPosts";

function useGetCountPostsByID(userId) {
  const {
    data: count,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["countPostsByID"],
    queryFn: () => getCountPostsByID(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return { count, isLoading, error };
}

export default useGetCountPostsByID;
