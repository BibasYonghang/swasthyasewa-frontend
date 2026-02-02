import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router-dom";
import MainLeftSidebar from "../Layout/sidebar/MainLeftSidebar.jsx";
import MainRightSidebar from "../Layout/sidebar/MainRightSidebar.jsx";

export default function MainLayout() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <aside className="">
          <MainLeftSidebar />
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>

        <aside className="">
          <MainRightSidebar />
        </aside>
      </div>
    </div>
  );
}
