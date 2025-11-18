import { FaComment, FaHeart } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
import React, { useEffect, useState, Suspense } from "react";
import useAddLike from "../hooks/Likes/useAddLike";
import useRemoveLike from "../hooks/Likes/useRemoveLike";
import useUserData from "../../../hooks/queryHooks/useUserData";
import CommentsSection from "./CommentsSection";

function PostActions({ postId, likesCount, commentsCount, isLikedByMe }) {
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useState(likesCount);
  const [optimisticLiked, setOptimisticLiked] = useState(isLikedByMe);

  const { addLike } = useAddLike();
  const { removeLike } = useRemoveLike();
  const user = useUserData();

  useEffect(() => {
    setOptimisticLikes(likesCount);
    setOptimisticLiked(isLikedByMe);
  }, [likesCount, isLikedByMe]);

  const toggleLike = async () => {
    if (!user) return;

    if (!optimisticLiked) {
      setOptimisticLiked(true);
      setOptimisticLikes((c) => c + 1);
      try {
        await addLike({ userId: user.id, postId });
      } catch (err) {
        setOptimisticLiked(false);
        setOptimisticLikes((c) => c - 1);
        console.error("Failed to add like:", err);
      }
    } else {
      setOptimisticLiked(false);
      setOptimisticLikes((c) => c - 1);
      try {
        await removeLike({ userId: user.id, postId });
      } catch (err) {
        setOptimisticLiked(true);
        setOptimisticLikes((c) => c + 1);
        console.error("Failed to remove like:", err);
      }
    }
  };

  return (
    <div className="mt-3 flex items-center gap-2">
      <button
        onClick={toggleLike}
        className="flex items-center cursor-pointer gap-2 text-sm font-semibold p-2 dark:text-white hover:bg-gray-200 rounded-md"
      >
        <FaHeart
          className={`w-5 h-5 duration-300 ${
            optimisticLiked ? "fill-red-500" : "fill-gray-400"
          }`}
        />
        <span>{optimisticLikes}</span>
      </button>

      <button
        onClick={() => setShowCommentSection(true)}
        className="flex items-center cursor-pointer gap-2 text-sm font-semibold p-2 dark:text-white hover:bg-gray-200 rounded-md"
      >
        <FaComment className="w-5 h-5 text-gray-400" />
        <span>{commentsCount}</span>
      </button>

      {showCommentSection && (
        <CommentsSection
          postId={postId}
          onClose={() => setShowCommentSection(false)}
        />
      )}

      <button className="flex items-center cursor-pointer gap-2 text-sm font-semibold p-2 dark:text-white hover:bg-gray-200 rounded-md">
        <MdOutlineIosShare className="w-5 h-5 text-gray-400" />
        <span>Share</span>
      </button>
    </div>
  );
}

export default React.memo(PostActions);
