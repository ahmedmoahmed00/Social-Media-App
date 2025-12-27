import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function FriendCard({ friend, isActive }) {
  const lastMessage = friend?.last_message;

  const date = lastMessage ? dayjs(lastMessage.created_at) : null;
  const diffInSeconds = date ? dayjs().diff(date, "second") : null;

  const formattedTime =
    diffInSeconds === null ? "" : diffInSeconds < 60 ? "now" : date.fromNow();

  return (
    <div
      className={`${
        isActive && "bg-gray-200 dark:bg-gray-700"
      } p-4 flex gap-3 items-center dark:text-dark-primary dark:hover:dark:bg-gray-700 hover:bg-gray-200`}
    >
      <img
        className="w-10 h-10 rounded-full shrink-0 object-cover"
        src={friend?.avatar_url}
        alt="Avatar Friend"
      />ذ

      <div className="w-full">
        <div className="mb-1 flex items-center justify-between w-full">
          <h2 className="font-semibold">{friend?.full_name || "Unknown"}</h2>
          <p className="text-xs text-gray-900 dark:text-gray-200">
            {formattedTime}
          </p>
        </div>

        <div className="flex items-center justify-between w-full">
          <p className="text-xs border border-gray-300 min-h-6 rounded-md pl-1 w-full text-left lg:text-sm truncate pr-2">
            {lastMessage?.content || "Start a conversation"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
