import React from "react";
import { Outlet } from "react-router-dom";
import DoctorConsultations from "./sidebar/left/DoctorConsultations";

export default function DoctorConsultationsLayout() {
  return (
    <>
      <div className="flex">
        <DoctorConsultations />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
