import { Route } from "react-router-dom";
import ProfileLayout from "../Layout/ProfileLayout.jsx";
import Profile from "../pages/Profile.jsx";

export const profileRoutes = [
  <Route element={<ProfileLayout />}>
    <Route path="/profile/:id" element={<Profile />} />
  </Route>,
];
