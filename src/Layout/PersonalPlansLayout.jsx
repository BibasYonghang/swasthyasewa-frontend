import React from "react";
import { Outlet } from "react-router-dom";
import PersonalPlans from "../pages/main-sidebars/PersonalPlans.jsx";

export default function PersonalPlansLayout() {
  return (
    <>
      <PersonalPlans />
      <main>
        <Outlet />
      </main>
    </>
  );
}
