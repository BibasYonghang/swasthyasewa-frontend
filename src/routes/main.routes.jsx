import { Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Welcome from "../pages/Welcome.jsx";

export const mainRoutes = [
  <Route path="/" element={<Welcome />} />,
  <Route element={<MainLayout />}>
    ,
    <Route path="/home" element={<Home />} />,
  </Route>,
];
