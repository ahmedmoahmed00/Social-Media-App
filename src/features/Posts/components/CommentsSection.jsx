import Modal from "../../../components/ui/Modal";
import DefualtAvatar from "../../../assets/User imgs/DefualtAvatar.jpg";
import CreateComment from "./CreateComment";
import useGetCommentsPost from "../hooks/Comments/useGetCommentsPost";
import CommentSkeleton from "./ui/CommentSkeleton";
import CommentBox from "./ui/CommentBox";
import ScrollTrigger from "./ScrollTrigger";

const LIMIT = 7;

function CommentsSection({ postId, onClose }) {
  const {
    comments,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCommentsPost(LIMIT, postId);

  const handleReachEnd = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const renderSkeletons = (count = 3) =>
    Array.from({ length: count }).map((_, i) => <CommentSkeleton key={i} />);

  return (
    <Modal onClose={onClose}>
      <div className="md:py-3 md:px-4 h-[65vh]   dark:bg-black flex flex-col ">
        <div className="flex-1 overflow-auto scrollable flex flex-col gap-4 pb-8 border-b border-b-primary dark:border-b-dark-primary">
          {isLoading && renderSkeletons()}

          {!isLoading &&
            comments?.map((comment) => (
              <CommentBox
                key={comment.id || comment.comment_id}
                comment={comment}
              />
            ))}

          {isFetchingNextPage && renderSkeletons()}

          <ScrollTrigger onReach={handleReachEnd} />
        </div>

        <div className="flex items-start gap-2 pt-4">
          <div className="w-10 rounded-full">
            <img
              className="w-10 rounded-full"
              src={DefualtAvatar}
              alt="User Avatar"
            />
          </div>
          <CreateComment postId={postId} />
        </div>
      </div>
    </Modal>
  );
}

export default CommentsSection;
