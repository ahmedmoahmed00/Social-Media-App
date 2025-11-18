import { formatNumber } from "../../../utils/helpers";
import useGetCountPostsByID from "../hooks/Posts/useGetCountPostsByID";
import ActionsProfile from "./ActionsProfile";

function HeadrProfile({
  friendID,
  userID,
  profileUserId,
  user,
  isProfileOwnUser,
}) {
  const { count: PostsCount, isLoading } = useGetCountPostsByID(profileUserId);

  return (
    <div className="rounded-lg overflow-hidden border border-primary dark:border-dark-primary">
      <div className="w-full h-50 relative overflow-hidden ">
        <img
          src={user.user_data.bigavatar_url || "/default-cover.jpg"}
          alt="Profile Cover"
          className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="size-24 -mt-13 mb-2 md:mb-0 max-[767px]:mx-auto relative ">
          <img
            className="size-24 object-cover rounded-full "
            src={user?.user_data.avatar_url}
            alt={"User Avatar"}
          />
        </div>
        {!isProfileOwnUser && (
          <ActionsProfile friendID={friendID} userID={userID} />
        )}
        <div className=" max-[767px]:text-center">
          <h1 className="text-xl lg:text-2xl font-bold dark:text-white">
            {user.user_data.full_name}
          </h1>
          <p className="text-gray-600">@{user.user_data.userName}</p>
        </div>
        <div className="mt-4 dark:text-white text-center md:text-left">
          <p className=" text-sm lg:text-base">{user.user_data.bio || "xxx"}</p>
        </div>
        <div className="mt-4 justify-center md:justify-start dark:text-white flex items-center gap-4">
          <p>
            <span className="font-semibold text-sm lg:text-base">
              {formatNumber(user.friends_count)}
            </span>{" "}
            <span>Friends</span>
          </p>
          <p>
            <span className="font-semibold text-sm lg:text-base">
              {formatNumber(isLoading ? 0 : PostsCount || 0)}
            </span>{" "}
            <span>Posts</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeadrProfile;
