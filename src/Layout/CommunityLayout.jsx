import React from "react";
import CommunityLeftSidebar from "./sidebar/left/CommunityLeftSidebar.jsx";
import { Outlet } from "react-router-dom";

export default function CommunityLayout() {
  return (
    <>
      <div className="flex">
        <CommunityLeftSidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
