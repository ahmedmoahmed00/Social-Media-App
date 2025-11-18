import React from "react";

function FriendCardSkeleton() {
  return (
    <div className="flex items-center  gap-4 p-3 rounded-lg bg-gray-100 animate-pulse w-full">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>

      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
        <div className="h-3 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default FriendCardSkeleton;
