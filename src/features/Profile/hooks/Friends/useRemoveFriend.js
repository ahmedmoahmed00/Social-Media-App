import { useMutation } from "@tanstack/react-query";
import { removeFriend } from "../../api/apiFirends";
import { toast } from "react-toastify";

function useRemoveFriend() {
  const { mutate } = useMutation({
    mutationKey: ["removeFriend"],
    mutationFn: ({ userID, friendID }) => removeFriend(userID, friendID),
    onSuccess: () => {
      toast.success("Friend removed successfully");
    },
    onError: (error) => {
      toast.error("Error removing friend");

      console.error("Error removing friend:", error);
    },
  });

  return { removeFriend: mutate };
}

export default useRemoveFriend;
