import React from "react";
import PostHelpLeftSidebar from "./sidebar/left/PostHelpLeftSidebar.jsx";
import { Outlet } from "react-router-dom";

export default function PostHelpLayout() {
  return (
    <>
      <div className="flex">
        <PostHelpLeftSidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
