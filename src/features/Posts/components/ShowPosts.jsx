import Post from "./Post";
import ScrollTrigger from "./ScrollTrigger";
import { useMemo } from "react";
import PostSkeleton from "./ui/PostSkeleton";
import useGetAllPostsInfinite from "../hooks/Posts/useGetAllPosts";
import useUserData from "../../../hooks/queryHooks/useUserData";

const LIMIT = 5;

function ShowPosts() {
  const user = useUserData();

  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAllPostsInfinite(LIMIT, user?.id);

  const postsToRender = useMemo(() => posts || [], [posts]);

  const handleReachEnd = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return (
    <>
      <div className="mx-4 flex flex-col gap-4">
        {isLoading &&
          Array.from({ length: 2 }).map((_, i) => <PostSkeleton key={i} />)}

        {postsToRender?.map((post) => (
          <Post key={post.id} post={post} />
        ))}

        <ScrollTrigger onReach={handleReachEnd} />

        {isFetchingNextPage &&
          Array.from({ length: 2 }).map((_, i) => <PostSkeleton key={i} />)}
      </div>
    </>
  );
}
export default ShowPosts;
