import { useQuery } from "@tanstack/react-query";
import { getUserByID } from "../../api/apiUser";

function useGetUserData(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserByID(id),
    enabled: !!id,
  });

  return { data, isLoading, error };
}

export default useGetUserData;
