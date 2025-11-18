import { useQuery } from "@tanstack/react-query";
import { checkIsFriend } from "../../api/apiFirends";

function useCheckIsFriend(userId, friendId) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["checkIsFriend", userId, friendId],
    queryFn: () => checkIsFriend(userId, friendId),
  });

  return { data, error, isLoading };
}

export default useCheckIsFriend;
