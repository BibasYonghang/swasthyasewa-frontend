import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Components/Layout/MainLayout";
import AdminLayout from "./Components/Layout//AdminLayout";

import Home from "./Pages/Home";
import Map from "./Pages/Map";
import PostCreation from "./Pages/PostCreation";
import Chat from "./Pages/Chat";
import Profile from "./Pages/Profile";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import WelcomePage from "./pages/Welcome";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages (no navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<WelcomePage />} />

        {/* User layout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/post/new" element={<PostCreation />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>

        {/* Admin layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
