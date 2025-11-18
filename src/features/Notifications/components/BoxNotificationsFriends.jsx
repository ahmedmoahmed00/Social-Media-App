import { FiUserPlus } from "react-icons/fi";
import DefualtAvatar from "../../../assets/User imgs/DefualtAvatar.jpg";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import useAcceptedRequest from "../hooks/notificationsFriends/useAcceptedRequest";

function BoxNotificationsFriends({ friend }) {
  const { acceptRequest, isPending, isSuccess } = useAcceptedRequest();

  const handleAccept = () => {
    acceptRequest({ friendshipId: friend.friendship_id });
  };

  return (
    <div className="p-4 border hover:bg-gray-100 dark:hover:bg-gray-700  border-primary dark:border-primary-dark rounded-lg flex items-start gap-3">
      <div className="max-w-12 max-h-12 w-full h-full relative">
        <img
          src={friend.requester_avatar || DefualtAvatar}
          alt="Default Avatar"
          className="w-full h-full max-w-12 max-h-12 object-cover rounded-full"
        />
        <div className=" absolute p-1 rounded-full z-10 border border-primary dark:border-dark-primary bg-primary dark:bg-primary-dark text-white -bottom-1 -right-1">
          <FiUserPlus className="text-green-400" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-1 border-b border-b-primary dark:border-b-primary-dark pb-2 ">
          <div className="flex items-center gap-1">
            <h2 className="font-semibold dark:text-dark-primary text-primary">
              {friend.requester_name}
            </h2>
            <span className="text-gray-500">started following you</span>
          </div>
          <div className="text-sm text-gray-400 ">
            {dayjs(friend.sent_at).fromNow()}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isSuccess && (
            <button
              className="bg-dark-primary text-sm dark:bg-primary text-dark-primary dark:text-primary rounded px-4 py-2 font-semibold cursor-pointer "
              onClick={handleAccept}
              disabled={isPending}
            >
              {isPending ? "Accepting..." : "Accept"}
            </button>
          )}

          <Link
            to={`/profile/${friend.requester_id}`}
            className="bg-dark-primary text-sm dark:bg-primary text-dark-primary dark:text-primary rounded px-4 py-2 font-semibold cursor-pointer "
          >
            Show profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BoxNotificationsFriends;
