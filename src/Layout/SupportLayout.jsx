import React from "react";
import { Outlet } from "react-router-dom";
import Support from "./sidebar/left/Support";

export default function SupportLayout() {
  return (
    <>
      <div className="flex">
        <Support />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
