import { useQueryClient } from "@tanstack/react-query";

function useUserData() {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user"]);

  return user;
}

export default useUserData;
