import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
import { LuPen } from "react-icons/lu";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { toast } from "react-toastify";
import useDeletePost from "../hooks/Posts/useDeletePost";
import useUserData from "../../../hooks/queryHooks/useUserData";
import { Link } from "react-router-dom";

function PostHeader({ author, postId }) {
  const [openPostOptions, setOpenPostOptions] = useState(false);
  const user = useUserData();
  const ref = useOutsideClick(() => setOpenPostOptions(false));

  const { deletePost } = useDeletePost();

  const handelDeletePost = () => {
    deletePost(postId);
  };

  const postHasUser = author?.id === user?.id;

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to={`/profile/${author.id}`}>
          <div className="size-10 rounded-full">
            <img
              src={author?.avatar_url}
              loading="lazy"
              alt="Avatar"
              className="rounded-full size-10"
            />
          </div>
        </Link>
        <div className="dark:text-white ">
          <Link className="hover:underline" to={`/profile/${author.id}`}>
            <h2 className="text-sm font-semibold">{author.full_name}</h2>
          </Link>
          <Link to={`/profile/${author.id}`}>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              @{author.username || author.userName}
            </p>
          </Link>
        </div>
      </div>
      {postHasUser && (
        <div className="relative">
          <button
            onClick={() => setOpenPostOptions((prev) => !prev)}
            aria-label="Post options"
            className="hover:bg-gray-300 p-2 rounded-sm cursor-pointer dark:hover:bg-gray-500 dark:text-white"
          >
            <GoKebabHorizontal />
          </button>
          {openPostOptions && (
            <div className=" fixed min-h-screen  w-full top-0 left-0" />
          )}
          {openPostOptions && (
            <div
              ref={ref}
              className="bg-primary absolute right-0 w-[130px] dark:bg-dark-primary p-1 border border-gray-200 rounded-md flex flex-col  text-sm "
            >
              <button
                onClick={() => {
                  toast.warning("Can’t edit now.");
                  toast.warning("كسلت اعملها يرجاله");
                }}
                className="py-1.5 px-2 flex items-center gap-2 cursor-pointer text-primary dark:text-dark-primary hover:bg-gray-300 w-full text-left rounded-md"
              >
                <span>
                  <LuPen />
                </span>
                <span>Edit Post</span>
              </button>
              <button
                onClick={() => handelDeletePost()}
                className="py-1.5 text-[#D4183D] px-2 flex items-center gap-2 cursor-pointer hover:bg-gray-300 w-full text-left rounded-md"
              >
                <span>
                  <FaRegTrashAlt />
                </span>
                <span> Delete Post</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default PostHeader;
