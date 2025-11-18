import { useMutation } from "@tanstack/react-query";
import { removeSendFriendRequest as ApiRemoveSendFriendRequest } from "../../api/apiFirends";
import { toast } from "react-toastify";

function useRemoveSendFriendRequest() {
  const { mutate: removeSendFriendRequest } = useMutation({
    mutationKey: ["removeSendFriendRequest"],
    mutationFn: ({ userID, friendID }) =>
      ApiRemoveSendFriendRequest(userID, friendID),
    onSuccess: (data) => {
      toast.success("Friend request removed successfully");
      console.log(data);
    },
    onError: () => {
      toast.error("Error removing friend request");
    },
  });

  return { removeSendFriendRequest };
}

export default useRemoveSendFriendRequest;
