import { useEffect, useRef, useState } from "react";
import useAddComment from "../hooks/Comments/useAddComment";
import { toast } from "react-toastify";

function CreateComment({ postId, user }) {
  const [isFocus, setIsFocus] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const { addComment, isLoading } = useAddComment();

  const textareaRef = useRef(null);

  const handelCreateComment = () => {
    const userId = user.id;
    if (!commentValue.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    addComment({
      post_id: postId,
      author_id: userId,
      content: commentValue,
    });
    setCommentValue("");
  };

  useEffect(() => {
    if (!isFocus) return;
    if (!textareaRef.current) return;

    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      textareaRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    };

    viewport.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("resize", handleResize);
    };
  }, [isFocus]);  

  return (
    <div className="flex-1 text-right">
      <textarea
        ref={textareaRef}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        className="w-full h-24 resize-none rounded-lg px-3 py-2 bg-gray-200 outline-none text-gray-500"
        placeholder="Write a comment..."
      />
      <button
        onClick={handelCreateComment}
        disabled={!commentValue.trim() || isLoading}
        className="mt-2 px-3 py-1.5 bg-black text-white rounded-md disabled:bg-gray-500"
      >
        Comment
      </button>
    </div>
  );
}

export default CreateComment;
