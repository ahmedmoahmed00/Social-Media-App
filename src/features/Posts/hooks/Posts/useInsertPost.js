import { useMutation } from "@tanstack/react-query";
import { insertPost as apiInsertPost } from "../../api/apiPosts";
import { toast } from "react-toastify";

function useInsertPost() {
  const {
    mutate: insertPost,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: ({ userId, postContent, filePost }) =>
      apiInsertPost(userId, postContent, filePost),
    onSuccess: () => {
      toast.success("Post Successfully Created");
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  return { insertPost, isLoading, isError };
}

export default useInsertPost;
