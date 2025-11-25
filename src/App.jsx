import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout//AdminLayout";

import Home from "./Pages/Home";
import Map from "./Pages/Map";
import PostCreation from "./Pages/PostCreation";
import Chat from "./Pages/Chat";
import Profile from "./Pages/Profile";
import CreatePost from "./pages/CreatePost";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import WelcomePage from "./pages/Welcome";
import Settings from "./pages/Settings";
import SettingsLayout from "./Layout/SettingsLayout";
import SavedLayout from "./Layout/SavedLayout";
import Saved from "./pages/Saved";

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
          <Route path="/create-post" element={<CreatePost />} />
        </Route>

        <Route element={<SettingsLayout />}>
          <Route path="/settings-layout" element={<Settings />} />
        </Route>
        <Route element={<SavedLayout />}>
          <Route path="/saved" element={<Saved />} />
        </Route>

        {/* Admin layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
