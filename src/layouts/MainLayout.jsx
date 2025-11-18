import { Outlet } from "react-router-dom";
import HeaderMainLayout from "../components/common/HeaderMainLayout";
import { DarkModeProvider } from "../Context/ThemeContext";

function MainLayout() {
  return (
    <DarkModeProvider>
      <div className="bg-primary dark:bg-dark-primary flex flex-col min-h-screen">
        <HeaderMainLayout />
        <div className="max-w-7xl w-full mx-auto mt-7 flex-1">
          <Outlet />
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default MainLayout;
