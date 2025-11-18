import { useMutation } from "@tanstack/react-query";
import { changeBigAvatar } from "../api/apiUserSettings";
import { toast } from "react-toastify";

function useChangeBigAvatar() {
  const {
    mutate: changeBigAvatarMutate,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ userId, bigAvatarFile }) =>
      changeBigAvatar(userId, bigAvatarFile),
    onSuccess: () => {
      toast.success("BigAvatar changed successfully");
    },
    onError: () => {
      toast.error("Failed to change BigAvatar");
      console.error("Change BigAvatar failed:", error);
    },
  });

  return {
    changeBigAvatar: changeBigAvatarMutate,
    isLoading,
    isError,
    error,
    isSuccess,
  };
}

export default useChangeBigAvatar;
