import { Route } from "react-router-dom";
import CreateStory from "../pages/CreateStory.jsx";
import NearbyClinics from "../pages/NearbyClinics.jsx";
import VideoConsult from "../pages/VideoConsult.jsx";
import Messages from "../pages/Messages.jsx";
import MyReports from "../pages/MyReports.jsx";
import DoctorConsultations from "../pages/DoctorConsultations.jsx";
import Wallet from "../pages/Wallet.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import HealthTests from "../pages/HealthTest.jsx";
import Support from "../pages/Support.jsx";
import FindDoctors from "../pages/FindDoctors.jsx";
import Medications from "../pages/Medications.jsx";

export const otherRoutes = [
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
