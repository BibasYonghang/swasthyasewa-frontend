import React from "react";
import { Outlet } from "react-router-dom";
import Settings from "./sidebar/left/Settings";

export default function SettingsLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Settings />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
