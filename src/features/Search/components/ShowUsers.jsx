import { IoMdTrendingUp } from "react-icons/io";
import UserCard from "./ui/UserCard";
import TrendingSearches from "./TrendingSearches";
import SkeletonUserCard from "./ui/SkeletonUserCard";

function ShowUsers({ users, isFetchingSearchUsers, isLoading }) {
  return (
    <div className="p-4  rounded-lg border border-primary dark:border-dark-primary mt-6">
      {!isFetchingSearchUsers && !isLoading && (
        <div className="p-4 max-h-[400px] overflow-auto">
          <div>
            <h2 className="flex gap-3 items-center">
              <span className="text-gray-400 text-2xl">
                <IoMdTrendingUp />
              </span>
              <span className="font-semibold text-primary dark:text-dark-primary">
                Trending searches
              </span>
            </h2>
          </div>
          <div className="mt-5    ">
            <TrendingSearches />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonUserCard key={i} />
          ))}
        </div>
      )}

      {isFetchingSearchUsers && !isLoading && users?.length === 0 && (
        <div className="text-gray-300 flex items-center justify-center">
          No Users Found
        </div>
      )}

      {users.length > 0 && (
        <div className="flex flex-col gap-6 p-4">
          {users.map((user, index) => (
            <UserCard user={user} index={index + 1} key={user.id || index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowUsers;
