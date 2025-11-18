import { useMutation } from "@tanstack/react-query";
import { removeLike as apiRemoveLike } from "../../api/apiLikes";

function useRemoveLike() {
  const {
    mutate: removeLike,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: ({ userId, postId }) => apiRemoveLike(userId, postId),
    onSuccess: () => {
      return true;
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  return { removeLike, isLoading, isError };
}

export default useRemoveLike;
