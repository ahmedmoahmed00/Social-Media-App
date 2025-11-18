import dayjs from "../../../../utils/dayjs";
import React from "react";

function CommentBox({ comment }) {
  return (
    <div className="flex items-center gap-4">
      <div className="size-9 md:size-10 rounded-full">
        <img
          className="size-9 md:size-10 rounded-full"
          src={comment.author.avatar_url}
          alt="User Avatar"
        />
      </div>
      <div className="flex-1 flex flex-col dark:bg-[#262626] gap-1 h-full rounded-lg lg:rounded-xl px-3 py-2 bg-gray-200 ">
        <div className="flex items-center  gap-2 flex-wrap">
          <h2 className="font-medium dark:text-white text-xs lg:text-sm">
            {comment.author.full_name}
          </h2>
          <p className="text-xs dark:text-gray-300 text-gray-500">
            @{comment.author.userName}
          </p>
          <p className="text-xs dark:text-gray-300 text-gray-500">
            {dayjs(comment.created_at).fromNow()}
          </p>
        </div>
        <div className=" py-2">
          <p className="text-xs dark:text-white lg:text-lg">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CommentBox);
