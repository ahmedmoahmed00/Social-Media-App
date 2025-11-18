import { useMutation } from "@tanstack/react-query";
import { changeAvatar } from "../api/apiUserSettings";
import { toast } from "react-toastify";

function useChangeAvatar() {
  const {
    mutate: changeAvatarMutate,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ userId, avatarFile }) => changeAvatar(userId, avatarFile),
    onSuccess: () => {
      toast.success("Avatar changed successfully");
    },
    onError: () => {
      toast.error("Failed to change avatar");
      console.error("Change avatar failed:", error);
    },
  });

  return {
    changeAvatar: changeAvatarMutate,
    isLoading,
    isError,
    error,
    isSuccess,
  };
}

export default useChangeAvatar;
