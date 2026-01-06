import React from "react";
import { Outlet } from "react-router-dom";
import MyReports from "./sidebar/left/MyReports";

export default function MyReportsLayout() {
  return (
    <>
      <div className="flex">
        <MyReports />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
