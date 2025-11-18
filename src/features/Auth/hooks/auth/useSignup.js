import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../api/apiAuth";
import { toast } from "react-toastify";

export function useSignup() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data) => signUp(data),
    onSuccess: (data) => {
      toast.success("Account created! Check your email.");

      console.log("Signup success ✅", data);
    },
    onError: (err) => {
      toast.error("❌ Email already in use.");
      console.error("Signup failed ❌", err.message);
    },
  });

  return { signup: mutate, isLoading: isPending, isError };
}

export default useSignup;
