import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../api/apiAuth";
import { toast } from "react-toastify";

export function useSignup() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data) => signUp(data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
      console.error("Signup failed", err.message);
    },
  });

  return { signup: mutate, isLoading: isPending, isError };
}

export default useSignup;
