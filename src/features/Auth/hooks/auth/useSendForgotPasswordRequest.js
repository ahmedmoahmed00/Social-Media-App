import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../api/apiAuth";
import { toast } from "react-toastify";

function useSendForgotPasswordRequest() {
  const {
    mutate: sendForgotPasswordRequest,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (email) => forgotPassword(email),
    onSuccess: (data) => {
      console.log("Forgot Password Request successful", data);
      toast.success(data.message || "Password reset link sent successfully.");
    },
    onError: (error) => {
      console.error("Forgot Password Request failed", error);
      toast.error(error.message || "An error occurred. Please try again.");
    },
  });

  return { sendForgotPasswordRequest, isLoading, isSuccess, isError, error };
}

export default useSendForgotPasswordRequest;
