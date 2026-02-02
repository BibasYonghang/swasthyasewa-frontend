import { Route } from "react-router-dom";
import PersonalPlansLayout from "../Layout/PersonalPlansLayout.jsx";
import PersonalPlans from "../pages/main-left-sidebar/PersonalPlans.jsx";

export const personalPlansRoutes = [
  <Route element={<PersonalPlansLayout />}>
    <Route path="/personal-plans" element={<PersonalPlans />} />
  </Route>,
];
