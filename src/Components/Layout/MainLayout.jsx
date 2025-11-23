import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      {/* TOP NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT AREA */}
      <div className="flex">
        {/* LEFT SIDEBAR */}
        <LeftSidebar />

        {/* CENTER CONTENT */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* RIGHT SIDEBAR */}
        <RightSidebar />
      </div>
    </div>
  );
}
