import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../api/apiAuth";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    mutate: login,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  return { login, isLoading, isError };
}

export default useLogin;
