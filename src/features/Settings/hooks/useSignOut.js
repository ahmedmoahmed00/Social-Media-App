import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signOut as signOutApi } from "../api/apiUserSettings";

function useSignOut() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: signOut, isPending: isLoading } = useMutation({
    mutationFn: () => signOutApi(),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });

  return { signOut, isLoading };
}

export default useSignOut;
