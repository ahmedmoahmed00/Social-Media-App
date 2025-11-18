import { FaCamera } from "react-icons/fa";
import ScrollTrigger from "../../../Posts/components/ScrollTrigger";

function ShowMediaProfilePage({ posts, handleReachEnd }) {
  const mediaPosts = posts?.filter((post) => post.media_url);

  if (mediaPosts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <FaCamera className="text-6xl mb-4" />
        <div className="text-xl font-semibold">No media found</div>
        <div className="text-gray-500">
          When you share photos or videos, they'll appear here.
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 grid-cols-4 mt-6 p-3  border border-primary rounded-lg">
      {mediaPosts?.map((post) =>
        post.media_url ? (
          <div key={post.id} className="size-60 overflow-hidden rounded-lg">
            <img
              src={post.media_url}
              alt="Post Media"
              className="w-full  h-full object-cover hover:scale-105 transition-transform cursor-pointer"
            />
          </div>
        ) : null
      )}

      <ScrollTrigger onReach={handleReachEnd} />
    </div>
  );
}

export default ShowMediaProfilePage;
