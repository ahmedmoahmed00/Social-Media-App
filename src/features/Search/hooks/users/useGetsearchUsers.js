import { useMutation } from "@tanstack/react-query";
import { getSearchUsers } from "../../api/apiUsers";

function useGetsearchUsers() {
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["user-search"],
    mutationFn: ({ search, userID }) => getSearchUsers(search, userID),
  });

  return { mutate, data, isPending };
}

export default useGetsearchUsers;
