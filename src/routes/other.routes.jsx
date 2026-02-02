import { Route } from "react-router-dom";
import CreateStory from "../pages/CreateStory.jsx";
import NearbyClinics from "../pages/NearbyClinics.jsx";
import VideoConsult from "../pages/VideoConsult.jsx";
import Messages from "../pages/Messages.jsx";
import MyReports from "../pages/main-sidebars/MyReports.jsx";
import DoctorConsultations from "../pages/main-sidebars/DoctorConsultations.jsx";
import Wallet from "../pages/main-sidebars/Wallet.jsx";
import Dashboard from "../pages/main-sidebars/Dashboard.jsx";
import HealthTests from "../pages/main-sidebars/HealthTest.jsx";
import Support from "../pages/Support.jsx";
import FindDoctors from "../pages/main-sidebars/FindDoctors.jsx";
import Medications from "../pages/main-sidebars/Medications.jsx";
import CreatePost from "../pages/CreatePost.jsx";

export const otherRoutes = [
  <Route path="/create-post" element={<CreatePost />} />,

  <Route path="/create-story" element={<CreateStory />} />,
  <Route path="/nearby-clinics" element={<NearbyClinics />} />,
  <Route path="/video-consult" element={<VideoConsult />} />,
  <Route path="/messages" element={<Messages />} />,
  <Route path="/my-reports" element={<MyReports />} />,
  <Route path="/wallet" element={<Wallet />} />,
  <Route path="/doctor-consultations" element={<DoctorConsultations />} />,
  <Route path="/dashboard" element={<Dashboard />} />,
  <Route path="/health-test" element={<HealthTests />} />,
  <Route path="/support" element={<Support />} />,
  <Route path="/doctors" element={<FindDoctors />} />,
  <Route path="/medications" element={<Medications />} />,
];
