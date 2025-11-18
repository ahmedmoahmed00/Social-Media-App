import Post from "../../Posts/components/Post";
import ScrollTrigger from "../../Posts/components/ScrollTrigger";

function ShowPostsProfilePage({ posts, handleReachEnd }) {
  return (
    <>
      {posts?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="text-xl font-semibold">No posts found</div>
          <div className="text-gray-500">
            When you share posts, they'll appear here.
          </div>
        </div>
      )}

      <div className="mt-6">
        {posts?.map((post) => (
          <div key={post.id} className="mb-4">
            <Post post={post} />
          </div>
        ))}
        <ScrollTrigger onReach={handleReachEnd} />
      </div>
    </>
  );
}

export default ShowPostsProfilePage;
