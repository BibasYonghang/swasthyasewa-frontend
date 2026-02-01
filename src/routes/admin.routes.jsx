import { Route } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";

export const adminRoutes = [
  <Route element={<AdminLayout />} key="admin-layout">
    <Route path="/admin" element={<AdminDashboard />} />
  </Route>,
];
