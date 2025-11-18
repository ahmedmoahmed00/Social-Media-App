import { FiUserPlus } from "react-icons/fi";

export default function FriendRequestSkeleton() {
  return (
    <div className="p-4 border border-primary dark:border-primary-dark rounded-lg flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 animate-pulse">
      <div className="max-w-12 max-h-12 w-full h-full relative">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="absolute p-1 rounded-full z-10 border border-primary dark:border-dark-primary bg-primary dark:bg-primary-dark text-white -bottom-1 -right-1">
          <FiUserPlus className="text-green-400" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-1 border-b border-b-primary dark:border-b-primary-dark pb-2">
          <div className="flex items-center gap-1">
            <div className="w-24 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-32 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="w-16 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-28 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
