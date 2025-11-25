import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router-dom";
import MainLeftSidebar from "../Layout/sidebar/left/MainLeftSidebar";
import MainRightSidebar from "../Layout/sidebar/right/MainRightSidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex">
        <MainLeftSidebar />

        <main className="flex-1">
          <Outlet />
        </main>

        <MainRightSidebar />
      </div>
    </div>
  );
}
