import { useMutation } from "@tanstack/react-query";
import { addLike as apiAddLike } from "../../api/apiLikes";

function useAddLike() {
  const {
    mutate: addLike,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: ({ userId, postId }) => apiAddLike(userId, postId),
    onSuccess: () => {
      return true;
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  return { addLike, isLoading, isError };
}

export default useAddLike;
