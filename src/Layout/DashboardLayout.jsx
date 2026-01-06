import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./sidebar/left/Dashboard.jsx";

export default function DashboardLayout() {
  return (
    <>
      <div className="flex">
        <Dashboard />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
