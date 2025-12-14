import { MdMoreVert, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import DefualtAvatar from "../../../assets/User imgs/DefualtAvatar.jpg";
import ChatHeaderSkeleton from "./ui/ChatHeaderSkeleton";
import { Link } from "react-router-dom";
import { useState } from "react";

function ChatHeader({ setFriendSelected, friend }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!friend) {
    return <ChatHeaderSkeleton />;
  }

  return (
    <div className="w-full border-b border-b-gray-200  dark:border-gray-600 p-6  flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="mr-3 min-[767px]:hidden">
          <button
            onClick={() => setFriendSelected(null)}
            className="dark:text-dark-primary dark:hover:bg-gray-500 cursor-pointer p-2 hover:bg-gray-200 rounded-md"
          >
            <MdOutlineKeyboardArrowLeft className="scale-125" />
          </button>
        </div>
        <div>
          <div className=" size-10 rounded-full">
            <img
              className="rounded-full size-10"
              src={friend.avatar_url || DefualtAvatar}
              alt="Defualt Avatar"
            />
          </div>
        </div>
        <div className="dark:text-dark-primary">
          <p className="font-medium text-sm lg:text-base">
            {friend.full_name || "loading..."}
          </p>
          <p className="text-xs lg:text-sm text-gray-500">
            {friend.status === "active" ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className=" relative">
        <button
          aria-label="More options"
          onClick={() => setIsOpen((prev) => !prev)}
          className=" cursor-pointer"
        >
          <MdMoreVert className="scale-125  dark:text-dark-primary" />
        </button>

        {isOpen && (
          <div className="absolute rounded-lg right-0 z-10 mt-2 w-48">
            <Link
              to={`/profile/${friend.friend_id}`}
              className="block w-full text-left px-4 py-2 text-sm text-primary border rounded-md cursor-pointer bg-primary border-primary dark:border-dark-primary dark:bg-dark-primary hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              View Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
