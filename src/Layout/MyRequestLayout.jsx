import React from "react";
import MyRequestsLeftSidebar from "./sidebar/left/MyRequestLeftSidebar.jsx";
import { Outlet } from "react-router-dom";

export default function MyRequestLayout() {
  return (
    <>
      <div className="flex">
        <MyRequestsLeftSidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
