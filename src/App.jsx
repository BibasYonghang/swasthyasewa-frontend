// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "./redux/auth/AuthSlice.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import AdminLayout from "./Layout//AdminLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Welcome from "./pages/Welcome.jsx";
import Settings from "./pages/settings/Settings.jsx";
import SettingsLayout from "./Layout/SettingsLayout.jsx";
import Wallet from "./pages/wallet/Wallet.jsx";
import CreatePost from "./pages/createPost/CreatePost.jsx";
import Profile from "./pages/Profile.jsx";
import Comment from "./pages/Comment.jsx";
import DashboardLayout from "./Layout/DashboardLayout.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import DoctorConsultationsLayout from "./Layout/DoctorConsultationsLayout.jsx";
import DoctorConsultation from "./pages/doctorConsultation/DoctorConsultation.jsx";
import MyReportsLayout from "./Layout/MyReportsLayout.jsx";
import MyReports from "./pages/myReports/MyReports.jsx";
import WalletLayout from "./Layout/WalletLayout.jsx";
import PersonalPlans from "./Layout/sidebar/left/PersonalPlans.jsx";
import PersonalPlansLayout from "./Layout/PersonalPlansLayout.jsx";
import SupportLayout from "./Layout/SupportLayout.jsx";
import Support from "./pages/support/Support.jsx";
import HealthTestLayout from "./Layout/HealthTestLayout.jsx";
import HealthTest from "./pages/healthTest/HealthTest.jsx";
import PostsLayout from "./Layout/PostsLayout.jsx";
import ProfileLayout from "./Layout/ProfileLayout.jsx";
import ScrollToTop from "./Components/Shared/ScrollToTop.jsx";
import CreateStory from "./pages/CreateStory.jsx";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Auto-login from localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/create-story" element={<CreateStory />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/comment" element={<Comment />} />
        </Route>

        <Route element={<ProfileLayout />}>
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        <Route element={<SettingsLayout />}>
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<DoctorConsultationsLayout />}>
          <Route
            path="/doctor-consultations"
            element={<DoctorConsultation />}
          />
        </Route>

        <Route element={<MyReportsLayout />}>
          <Route path="/my-reports" element={<MyReports />} />
        </Route>

        <Route element={<WalletLayout />}>
          <Route path="/wallet" element={<Wallet />} />
        </Route>

        <Route element={<PersonalPlansLayout />}>
          <Route path="/personal-plans" element={<PersonalPlans />} />
        </Route>

        <Route element={<SupportLayout />}>
          <Route path="/support" element={<Support />} />
        </Route>

        <Route element={<PostsLayout />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>

        <Route element={<HealthTestLayout />}>
          <Route path="/health-test" element={<HealthTest />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppContent;
