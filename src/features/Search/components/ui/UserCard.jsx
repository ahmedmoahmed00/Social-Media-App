import { Link } from "react-router-dom";
import DefualtAvatar from "../../../../assets/User imgs/DefualtAvatar.jpg";

function UserCard({ user, index }) {
  console.log(user);
  return (
    <div className="flex flex-col gap-4 not-last:border-b border-gray-200 dark:border-dark-primary pb-4">
      <div className="flex items-center gap-3">
        <div className="size-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span>{index}</span>
        </div>
        <div className="flex  items-center gap-3">
          <div className="size-10">
            <img
              className="rounded-full size-10"
              src={user?.avatar_url || DefualtAvatar}
              alt="Avatar"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary dark:text-dark-primary">
              {user.full_name}
            </h3>
            <p className="text-xs text-gray-500">@{user.userName}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <Link
          to={`/profile/${user.id}`}
          className="text-sm w-full flex items-center justify-center font-semibold p-2 rounded-md bg-dark-primary dark:bg-primary text-dark-primary dark:text-primary "
        >
          Show Profile
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
