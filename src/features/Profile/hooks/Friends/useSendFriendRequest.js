import { useMutation } from "@tanstack/react-query";
import { sendFriendRequest } from "../../api/apiFirends";
import { toast } from "react-toastify";

function useSendFriendRequest() {
  const { mutate } = useMutation({
    mutationKey: ["sendFriendRequest"],
    mutationFn: ({ userID, friendID }) => sendFriendRequest(userID, friendID),
    onSuccess: () => {
      toast.success("Friend request sent successfully");
    },
    onError: (error) => {
      toast.error("Error sending friend request");

      console.error("Error sending friend request:", error);
    },
  });

  return { sendFriendRequest: mutate };
}

export default useSendFriendRequest;
