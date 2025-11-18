import { useMutation } from "@tanstack/react-query";
import { deletePost as apiDeletePost } from "../../api/apiPosts";
import { toast } from "react-toastify";

function useDeletePost() {
  const {
    mutate: deletePost,
    isPending: isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (postID) => apiDeletePost(postID),
    onSuccess: () => {
      toast.success("Post has been deleted!");
    },
    onError: (error) => {
      console.error("Delete post failed:", error);
      toast.error("Failed to delete post");
    },
  });

  return { deletePost, isLoading, isError, error };
}

export default useDeletePost;
