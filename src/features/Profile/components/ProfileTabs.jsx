import { useState } from "react";

function ProfileTabs({ onChange }) {
  const [sectionActive, setSectionActive] = useState("posts");

  const handleClick = (section) => {
    setSectionActive(section);

    if (onChange) onChange(section);
  };

  return (
    <div className="mt-6 px-1 bg-gray-200 rounded-lg font-semibold relative">
      <div className="relative w-full">
        <div className="flex justify-between items-center relative text-sm md:text-base">
          <button
            onClick={() => handleClick("posts")}
            className={`w-full py-2 z-10 transition-colors duration-200  ${
              sectionActive === "posts"
                ? "font-semibold dark:text-white "
                : " cursor-pointer"
            }`}
          >
            Posts
          </button>

          <button
            onClick={() => handleClick("media")}
            className={`w-full py-2 z-10 transition-colors duration-200  ${
              sectionActive === "media"
                ? "font-semibold dark:text-white"
                : " cursor-pointer"
            }`}
          >
            Media
          </button>
        </div>

        <span
          className={`absolute top-1 h-8 w-1/2 dark:bg-black bg-white rounded-lg shadow-md transition-all duration-300 ${
            sectionActive === "media" ? "left-1/2" : "left-0"
          }`}
        ></span>
      </div>
    </div>
  );
}

export default ProfileTabs;
