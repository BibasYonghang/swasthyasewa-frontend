import React from "react";
import AlertsLeftSidebar from "./sidebar/left/AlertsLeftSidebar.jsx";
import { Outlet } from "react-router-dom";

export default function AlertsLayout() {
  return (
    <>
      <div className="flex">
        <AlertsLeftSidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
