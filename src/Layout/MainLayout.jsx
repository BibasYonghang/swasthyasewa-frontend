import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router-dom";
import MainLeftSidebar from "../Layout/sidebar/left/MainLeftSidebar.jsx";
import MainRightSidebar from "../Layout/sidebar/right/MainRightSidebar.jsx";

export default function MainLayout() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />

      {/* Main content area */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <aside className=" overflow-y-auto">
          <MainLeftSidebar />
        </aside>

        {/* Middle Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        <aside className=" overflow-y-auto">
          <MainRightSidebar />
        </aside>
      </div>
    </div>
  );
}
