import { useMutation } from "@tanstack/react-query";
import { addComment as apiAddComment } from "../../api/apiComments";
import { toast } from "react-toastify";

function useAddComment() {
  const {
    mutate: addComment,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: (newComment) => apiAddComment(newComment),
    onSuccess: () => {
      toast.success("Comment Added Successfully");
      return true;
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  return { addComment, isLoading, isError };
}

export default useAddComment;
