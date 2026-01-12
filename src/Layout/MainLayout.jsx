import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router-dom";
import MainLeftSidebar from "../Layout/sidebar/left/MainLeftSidebar.jsx";
import MainRightSidebar from "../Layout/sidebar/right/MainRightSidebar.jsx";
import ScrollToTop from "../Components/Shared/ScrollToTop.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollToTop />

      <div className="flex ">
        <MainLeftSidebar />

        <main className="flex-1">
          <Outlet />
        </main>

        <MainRightSidebar />
      </div>
    </div>
  );
}
