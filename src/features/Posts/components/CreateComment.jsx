import { useState } from "react";
import useUserData from "../../../hooks/queryHooks/useUserData";
import useAddComment from "../hooks/Comments/useAddComment";
import { toast } from "react-toastify";

function CreateComment({ postId }) {
  const [commentValue, setCommentValue] = useState("");
  const { addComment, isLoading } = useAddComment();
  const user = useUserData();

  const handelCreateComment = () => {
    const userId = user.id;

    if (commentValue.length <= 0) {
      toast.error("Comment cannot be empty.");
      return;
    }

    const newComment = {
      post_id: postId,
      author_id: userId,
      content: commentValue,
    };
    addComment(newComment);

    setCommentValue("");
  };
  return (
    <div className="flex-1 text-right  ">
      <textarea
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        className="w-full resize-none focus-visible:ring-gray-300 duration-200 focus-visible:ring-[4px] bg-gray-200 h-15 rounded-lg px-3 py-2 text-gray-500 outline-0"
        placeholder="Write a comment..."
      />
      <button
        onClick={() => handelCreateComment()}
        disabled={commentValue.length <= 0 || isLoading}
        className="mt-2 px-3 py-1.5 cursor-pointer disabled:pointer-events-none text-sm disabled:bg-gray-500 text-white font-semibold rounded-md bg-black"
      >
        Comment
      </button>
    </div>
  );
}

export default CreateComment;
