import { Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

export const authRoutes = [
  <Route path="/login" element={<Login />} key="login" />,
  <Route path="/register" element={<Register />} key="register" />,
];
