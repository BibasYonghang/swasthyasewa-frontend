import React from "react";
import { Outlet } from "react-router-dom";
import MessagesLeftSidebar from "./sidebar/left/MessageLeftSidebar.jsx";

export default function MessageLayout() {
  return (
    <>
      <MessagesLeftSidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
