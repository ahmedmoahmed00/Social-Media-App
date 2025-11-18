import dayjs from "../../../../utils/dayjs";

function MessageContent({ message, isUser }) {
  return (
    <div
      className={`${
        isUser
          ? "bg-black dark:bg-white dark:text-black text-white ml-auto"
          : "bg-gray-200 text-black dark:bg-gray-700 dark:text-dark-primary "
      } w-fit p-3 rounded-lg min-w-[15%] max-w-[75%] break-words mr-2`}
    >
      <p className="text-sm lg:text-base break-words break-all">
        {message.content}
      </p>
      <p className="text-xs mt-1 text-gray-600">
        {dayjs(message.created_at).format("hh:mm A")}
      </p>
    </div>
  );
}

export default MessageContent;
