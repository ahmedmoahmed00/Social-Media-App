import { useMutation } from "@tanstack/react-query";
import { resetPassword as apiResetPassword } from "../../api/apiAuth";
import { toast } from "react-toastify";

function useResetPassword() {
  const {
    mutate: resetPassword,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: ({ newpassword }) => apiResetPassword(newpassword),
    onSuccess: (data) => {
      console.log("Password reset successful", data);
      toast.success("Password has been reset successfully.");
    },
    onError: (error) => {
      console.error("Login failed", error);
      toast.error(`Error resetting password: ${error.message}`);
    },
  });

  return { resetPassword, isLoading, isError };
}

export default useResetPassword;
