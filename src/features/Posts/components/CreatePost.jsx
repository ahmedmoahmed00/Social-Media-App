import { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import useUserData from "../../../hooks/queryHooks/useUserData";
import useInsertPost from "../hooks/Posts/useInsertPost";
import TestImagePost from "../../../assets/Post/TestImagePost.jpg";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [filePost, setFilePost] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fileInputRef = useRef(null);

  const user = useUserData();

  const { insertPost, isLoading } = useInsertPost();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const submitPost = () => {
    insertPost({ userId: user.id, postContent, filePost });

    setPostContent("");
    setFilePost(null);
  };

  useEffect(() => {
    if (!filePost) return;

    const objectUrl = URL.createObjectURL(filePost);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [filePost]);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    setFilePost(file);
  };

  return (
    <div className="border border-primary mx-4 dark:border-dark-primary flex flex-col gap-9 rounded-lg p-main ">
      <div className="min-h-17 flex items-start gap-3">
        <div className="size-10 rounded-full">
          <img src={user?.avatar_url} alt="Avatar" className=" size-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-3 flex-1 h-full">
          <form className="  w-full bg-gray-200 text-sm h-full rounded-lg">
            <textarea
              onChange={(e) => setPostContent(e.target.value)}
              value={postContent}
              className=" resize-none w-full h-full px-3 py-2 text-mg outline-0 rounded-lg focus-visible:ring-gray-300 duration-200 focus-visible:ring-[4px]"
              placeholder="What's on your mind?"
            />
          </form>
          {filePost && (
            <div className="rounded-lg w-full relative">
              <button
                onClick={() => setFilePost(null)}
                className="bg-red-600 rounded-full p-2 text-white absolute right-2 top-2 cursor-pointer hover:bg-red-500"
              >
                <FaTimes size={16} />
              </button>
              <img
                className="rounded-lg w-full "
                src={previewUrl}
                alt="Img Post"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center cursor-pointer justify-center font-medium transition-all h-8 gap-1.5 px-3 rounded-lg text-gray-500 hover:bg-gray-200 text-sm"
        >
          <CiImageOn className="size-5 mr-1" />
          Photo
        </button>

        <button
          onClick={() => submitPost()}
          disabled={postContent.length <= 0 || isLoading}
          className=" font-medium transition-all cursor-pointer  disabled:bg-gray-500  px-3.5 py-1.5 bg-black text-white rounded-lg  text-sm "
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
