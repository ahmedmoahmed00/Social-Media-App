import { FaRegMoon, FaRegUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useDarkMode from "../../Context/useDarkMode";
import { LuSunDim } from "react-icons/lu";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import {
  IoChatbubbleOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
} from "react-icons/io5";

function HeaderMainLayout() {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <header className="bg-primary  sticky top-0 z-50 dark:bg-dark-primary border-b border-b-primary dark:border-dark-primary">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        <h1 className="text-lg lg:text-xl font-bold text-primary dark:text-dark-primary truncate">
          <Link to="/">SocialConnect</Link>
        </h1>

        <nav className="bg-primary dark:bg-dark-primary border-t border-t-primary dark:border-dark-primary static max-[767px]:fixed max-[767px]:bottom-0 max-[767px]:left-0 max-[767px]:right-0 sm:border-none">
          <ul className="flex justify-around sm:justify-center items-center gap-1 sm:gap-4 py-2 sm:py-3 sm:h-16">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-gray-200 text-primary dark:text-dark-primary"
                  } flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm transition-all`
                }
              >
                <AiOutlineHome size={18} />
                <span className="hidden sm:inline">Feed</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-gray-200 text-primary dark:text-dark-primary"
                  } flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm transition-all`
                }
              >
                <AiOutlineSearch size={18} />
                <span className="hidden sm:inline">Search</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-gray-200 text-primary dark:text-dark-primary"
                  } flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm transition-all`
                }
              >
                <IoChatbubbleOutline size={18} />
                <span className="hidden sm:inline">Chat</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-gray-200 text-primary dark:text-dark-primary"
                  } flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm transition-all`
                }
              >
                <FaRegUser size={18} />
                <span className="hidden sm:inline">Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-gray-200 text-primary dark:text-dark-primary"
                  } flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm transition-all`
                }
              >
                <IoNotificationsOutline size={18} />
                <span className="hidden sm:inline">Notifications</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-gray-200 text-primary dark:text-dark-primary"
                  } flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm transition-all`
                }
              >
                <IoSettingsOutline size={18} />
                <span className="hidden sm:inline">Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          onClick={toggleTheme}
          className="cursor-pointer p-2 text-primary dark:text-dark-primary hover:bg-gray-300 rounded-md"
          aria-label="Toggle website theme"
        >
          {!isDarkMode ? <FaRegMoon /> : <LuSunDim />}
        </button>
      </div>
    </header>
  );
}

export default HeaderMainLayout;
