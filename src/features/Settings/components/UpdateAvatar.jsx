import { BiCamera } from "react-icons/bi";
import DefualtAvatar from "../../../assets/User imgs/DefualtAvatar.jpg";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "./ui/Button";
import useChangeAvatar from "../hooks/useChangeAvatar";
import { useQueryClient } from "@tanstack/react-query";

function UpdateAvatar({ user }) {
  const queryClient = useQueryClient();
  const { changeAvatar, isLoading, isSuccess } = useChangeAvatar();

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

  const handleChangeAvatar = () => {
    if (!filePost || !user?.id) return;

    changeAvatar({ userId: user.id, avatarFile: filePost });
  };

  return (
    <div className="mt-6 flex items-center gap-4 mb-6">
      <div className="w-20 h-20 rounded-full">
        <img
          className=" w-20 h-20 rounded-full"
          src={previewUrl || user?.avatar_url || DefualtAvatar}
          alt="User Avatar"
        />
      </div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
        />

        <button
          onClick={handleClick}
          className="flex w-full dark:border-dark-primary dark:text-dark-primary text-primary justify-center items-center gap-2 font-semibold cursor-pointer text-sm border border-primary rounded-lg py-2 px-3"
        >
          <span>
            <BiCamera size={18} />
          </span>
          Change Photo
        </button>
        <p className="text-sm text-gray-500 mt-1">
          JPG, PNG or GIF. Max size 2MB.
        </p>
      </div>
      <div>
        {filePost && (
          <Button onClick={handleChangeAvatar} disabled={isLoading}>
            Change Avatar
          </Button>
        )}
      </div>
    </div>
  );
}

export default UpdateAvatar;
