import React from "react";
import { Outlet } from "react-router-dom";
import SettingsLeftSidebar from "./sidebar/left/SettingsLeftSidebar";

export default function SettingsLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SettingsLeftSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
