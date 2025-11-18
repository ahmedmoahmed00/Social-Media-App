import { FiImage } from "react-icons/fi";
import coverPlaceholder from "../../../assets/User imgs/coverPlaceholder.jpg";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "./ui/Button";
import useChangeBigAvatar from "../hooks/useChangeBigAvatar";
import { useQueryClient } from "@tanstack/react-query";

function UpdateBigAvatar({ user }) {
  const queryClient = useQueryClient();
  const { changeBigAvatar, isLoading, isSuccess } = useChangeBigAvatar();

  const fileInputRef = useRef(null);

  const [filePost, setFilePost] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
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

  useEffect(() => {
    if (isSuccess) {
      setFilePost(null);
      queryClient.invalidateQueries(["user"]);
    }
  }, [isSuccess]);

  const handleChangeBigAvatar = () => {
    if (!filePost || !user?.id) return;

    changeBigAvatar({ userId: user.id, bigAvatarFile: filePost });
  };

  return (
    <div>
      <div>
        <h2 className="text-sm font-semibold text-primary dark:text-dark-primary">
          Cover Photo
        </h2>
      </div>
      <div className="mt-4">
        <div className="w-full h-40 bg-gray-300 rounded-lg flex items-center justify-center ">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={previewUrl || user?.bigavatar_url || coverPlaceholder}
            alt="Cover Photo"
            loading="lazy"
          />
        </div>
        <div className="flex mt-3 items-center gap-3">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChange}
              className="hidden"
            />

            <button
              onClick={handleClick}
              className=" flex items-center text-primary  gap-2 font-semibold cursor-pointer text-sm border border-primary dark:border-dark-primary dark:text-dark-primary rounded-lg py-2 px-3"
            >
              <span>
                <FiImage size={16} />
              </span>
              Change Cover
            </button>
          </div>

          <div>
            {filePost && (
              <Button onClick={handleChangeBigAvatar} disabled={isLoading}>
                Change BigAvatar
              </Button>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Recommended size: 1200x400px
        </p>
      </div>
    </div>
  );
}

export default UpdateBigAvatar;
