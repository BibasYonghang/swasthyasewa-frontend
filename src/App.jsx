import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import AdminLayout from "./Layout//AdminLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Welcome from "./pages/Welcome.jsx";
import Settings from "./pages/settings/Settings.jsx";
import SettingsLayout from "./Layout/SettingsLayout.jsx";
import SavedLayout from "./Layout/SavedLayout.jsx";
import Saved from "./pages/saved/Saved.jsx";
import MessageLayout from "./Layout/MessageLayout.jsx";
import Message from "./pages/messages/Message.jsx";
import MyRequestLayout from "./Layout/MyRequestLayout.jsx";
import MyRequest from "./pages/myRequest/MyRequest.jsx";
import WalletLayout from "./Layout/WalletLayout.jsx";
import Wallet from "./pages/wallet/Wallet.jsx";
import NearbyHelpersLayout from "./Layout/NearbyHelpersLayout.jsx";
import NearbyHelpers from "./pages/helpers/NearbyHelpers.jsx";
import AlertsLayout from "./Layout/AlertsLayout.jsx";
import Alerts from "./pages/alerts/Alerts.jsx";
import PostHelpLayout from "./Layout/PostHelpLayout.jsx";
import CreatePost from "./pages/createPost/CreatePost.jsx";
import CommunityLayout from "./Layout/CommunityLayout.jsx";
import Community from "./pages/community/Community.jsx";
import Profile from "./pages/Profile.jsx";
import Comment from "./pages/Comment.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages (no navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Welcome />} />

        {/* User layout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/comment" element={<Comment />} />
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
