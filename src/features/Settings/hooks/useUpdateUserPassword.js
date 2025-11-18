import { useMutation } from "@tanstack/react-query";
import { updateUserPassword } from "../api/apiUserSettings";
import { toast } from "react-toastify";

function useUpdateUserPassword() {
  const {
    mutate: updateUserPasswordMutate,
    isPending: isLoading,
    data,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ currentPassword, newPassword, email }) =>
      updateUserPassword(currentPassword, newPassword, email),
    onSuccess: () => {
      toast.success("User password updated successfully");
    },
    onError: (error) => {
      toast.error(`Error updating user password: ${error.message}`);
    },
  });

  return {
    updateUserPassword: updateUserPasswordMutate,
    isLoading,
    data,
    isError,
    error,
    isSuccess,
  };
}

export default useUpdateUserPassword;
