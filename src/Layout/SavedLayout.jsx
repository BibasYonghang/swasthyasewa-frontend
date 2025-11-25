import React from "react";
import { Outlet } from "react-router-dom";
import SavedLeftSidebar from "./sidebar/left/SavedLeftSidebar.jsx";

export default function SavedLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SavedLeftSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
