import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/apiAuth";
import { data } from "react-router-dom";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
  });

  return { isLoading, user, isAuthenticated: !!user };
}
