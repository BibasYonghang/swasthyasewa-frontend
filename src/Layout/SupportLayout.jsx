import React from "react";
import { Outlet } from "react-router-dom";

export default function SupportLayout() {
  return (
    <>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
