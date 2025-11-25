import React from "react";
import WalletLeftSidebar from "./sidebar/left/WalletLeftSidebar.jsx";
import { Outlet } from "react-router-dom";

export default function WalletLayout() {
  return (
    <>
      <div className="flex">
        <WalletLeftSidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
