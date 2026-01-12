import React from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
