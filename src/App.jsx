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
import CreatePost from "./pages/createPost/CreatePost.jsx";
import Profile from "./pages/Profile.jsx";
import Comment from "./pages/Comment.jsx";
import PersonalPlans from "./Layout/sidebar/left/PersonalPlans.jsx";
import PersonalPlansLayout from "./Layout/PersonalPlansLayout.jsx";
import PostsLayout from "./Layout/PostsLayout.jsx";
import ProfileLayout from "./Layout/ProfileLayout.jsx";
import ScrollToTop from "./Components/Shared/ScrollToTop.jsx";
import CreateStory from "./pages/CreateStory.jsx";
import NearbyClinics from "./pages/NearbyClinics.jsx";
import VideoConsult from "./pages/VideoConsult.jsx";
import Messages from "./pages/Messages.jsx";
import Settings from "./pages/Settings.jsx";
import MyReports from "./pages/MyReports.jsx";
import DoctorConsultations from "./pages/DoctorConsultations.jsx";
import Wallet from "./pages/Wallet.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HealthTests from "./pages/HealthTest.jsx";
import Support from "./pages/Support.jsx";

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
        <Route path="/nearby-clinics" element={<NearbyClinics />} />
        <Route path="/video-consult" element={<VideoConsult />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route
          path="/doctor-consultations"
          element={<DoctorConsultations />}
        />{" "}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health-test" element={<HealthTests />} />
        <Route path="/support" element={<Support />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/comment" element={<Comment />} />
        </Route>
        <Route element={<ProfileLayout />}>
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route element={<PersonalPlansLayout />}>
          <Route path="/personal-plans" element={<PersonalPlans />} />
        </Route>
        <Route element={<PostsLayout />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppContent;
