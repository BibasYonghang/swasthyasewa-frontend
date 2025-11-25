import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout//AdminLayout";

import Home from "./Pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import WelcomePage from "./pages/Welcome";
import Settings from "./pages/settings/Settings";
import SettingsLayout from "./Layout/SettingsLayout";
import SavedLayout from "./Layout/SavedLayout";
import Saved from "./pages/saved/Saved";
import MessageLayout from "./Layout/MessageLayout";
import Message from "./pages/messages/Message";
import MyRequestLayout from "./Layout/MyRequestLayout";
import MyRequest from "./pages/myRequest/MyRequest";
import WalletLayout from "./Layout/WalletLayout";
import Wallet from "./pages/wallet/Wallet";
import NearbyHelpersLayout from "./Layout/NearbyHelpersLayout";
import NearbyHelpers from "./pages/helpers/NearbyHelpers";
import AlertsLayout from "./Layout/AlertsLayout";
import Alerts from "./pages/alerts/Alerts";
import PostHelpLayout from "./Layout/PostHelpLayout";
import CreatePost from "./pages/createPost/CreatePost";
import CommunityLayout from "./Layout/CommunityLayout";
import Community from "./pages/community/Community";

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
        </Route>

        <Route element={<SettingsLayout />}>
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route element={<SavedLayout />}>
          <Route path="/saved" element={<Saved />} />
        </Route>

        <Route element={<MessageLayout />}>
          <Route path="/message" element={<Message />} />
        </Route>

        <Route element={<MyRequestLayout />}>
          <Route path="/my-requests" element={<MyRequest />} />
        </Route>

        <Route element={<WalletLayout />}>
          <Route path="/wallet" element={<Wallet />} />
        </Route>

        <Route element={<NearbyHelpersLayout />}>
          <Route path="/helpers" element={<NearbyHelpers />} />
        </Route>

        <Route element={<AlertsLayout />}>
          <Route path="/alerts" element={<Alerts />} />
        </Route>

        <Route element={<PostHelpLayout />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>

        <Route element={<CommunityLayout />}>
          <Route path="/community" element={<Community />} />
        </Route>

        {/* Admin layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
