import BoxNotificationsFriends from "./BoxNotificationsFriends";
import useUserData from "../../../hooks/queryHooks/useUserData";
import useGetNotificationsFriends from "../hooks/notificationsFriends/useGetNotificationsFriends";
import FriendRequestSkeleton from "./ui/FriendRequestSkeleton";

function ShowNotificationsFriends() {
  const user = useUserData();

  const { data, error, isLoading } = useGetNotificationsFriends(user?.id);

  return (
    <div>
      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-4">
            <FriendRequestSkeleton />
          </div>
        ))}

      {error && (
        <p className="text-center text-lg p-3 border border-primary dark:border-dark-primary rounded-lg text-red-500  font-semibold">
          Error loading notifications.
        </p>
      )}

      {data && data.length === 0 && (
        <p className=" text-center text-lg p-3 border border-primary dark:border-dark-primary rounded-lg text-primary dark:text-dark-primary font-semibold">
          No new friend requests.
        </p>
      )}

      {data &&
        data.length > 0 &&
        data.map((friendship) => (
          <div key={friendship.friendship_id} className="mb-4">
            <BoxNotificationsFriends friend={friendship} />
          </div>
        ))}
    </div>
  );
}

export default ShowNotificationsFriends;
