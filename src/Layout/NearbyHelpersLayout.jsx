import React from "react";
import NearbyHelpersLeftSidebar from "./sidebar/left/NearbyHelpersLeftSidebar.jsx";
import { Outlet } from "react-router-dom";

export default function NearbyHelpersLayout() {
  return (
    <>
      <div className="flex">
        <NearbyHelpersLeftSidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
