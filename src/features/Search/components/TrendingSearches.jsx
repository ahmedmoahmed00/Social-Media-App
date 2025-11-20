import useGetTrendingUsers from "../hooks/users/useGetTrendingUsers";
import SkeletonUserCard from "./ui/SkeletonUserCard";
import UserCard from "./ui/UserCard";

function TrendingSearches() {
  const { data: trendingUsers, isLoading } = useGetTrendingUsers();

  return (
    <div className="flex flex-col gap-6 ">
      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => <SkeletonUserCard key={i} />)}
      {trendingUsers?.length === 0 ? (
        <div className="text-center text-gray-500 py-6 text-sm sm:text-base">
          No trending users found at the moment.
        </div>
      ) : (
        trendingUsers?.map((user, index) => (
          <UserCard index={index + 1} key={user.id} user={user} />
        ))
      )}
    </div>
  );
}

export default TrendingSearches;
