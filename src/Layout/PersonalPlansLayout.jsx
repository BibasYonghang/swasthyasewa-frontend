import React from "react";
import { Outlet } from "react-router-dom";
import PersonalPlans from "../pages/main-left-sidebar/PersonalPlans.jsx";

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
