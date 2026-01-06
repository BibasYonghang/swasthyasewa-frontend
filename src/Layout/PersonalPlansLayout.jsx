import React from "react";
import { Outlet } from "react-router-dom";
import PersonalPlans from "./sidebar/left/PersonalPlans";

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
