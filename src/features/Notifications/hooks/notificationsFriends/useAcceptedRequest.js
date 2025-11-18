import { useMutation } from "@tanstack/react-query";
import { acceptFriendRequest } from "../../api/acceptFriendRequest";
import { toast } from "react-toastify";

function useAcceptedRequest() {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["acceptFriendRequest"],
    mutationFn: ({ friendshipId }) => acceptFriendRequest(friendshipId),
    onSuccess: () => {
      toast.success("Friend request accepted!");
    },
    onError: (error) => {
      toast.error("Error accepting friend request: " + error.message);
    },
  });

  return { acceptRequest: mutate, isPending, isSuccess };
}

export default useAcceptedRequest;
