import React from "react";
import { Outlet } from "react-router-dom";
import HealthTests from "./sidebar/left/HealthTest";

export default function HealthTestLayout() {
  return (
    <>
      <div className="flex">
        <HealthTests />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
