import UpdateAvatar from "../UpdateAvatar";
import UpdateBigAvatar from "../UpdateBigAvatar";
import { FiImage } from "react-icons/fi";

function SettingProfileImagesSection({ user }) {
  return (
    <>
      <div>
        <h2 className="flex text-primary dark:text-dark-primary items-center gap-2">
          <span>
            <FiImage size={20} />
          </span>
          Profile Images
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        <div className="border-b border-primary dark:border-dark-primary">
          <UpdateAvatar user={user} />
        </div>
        <div>
          <UpdateBigAvatar user={user} />
        </div>
      </div>
    </>
  );
}

export default SettingProfileImagesSection;
