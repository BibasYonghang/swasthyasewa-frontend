// src/Components/Layout/RightSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Users,
  Sparkles,
  FileText,
  Plus,
  Clock,
  Heart,
} from "lucide-react";

// Quick Actions for HealthConnect
const quickActions = [
  {
    label: "Log Health Data",
    icon: <Plus size={18} />,
    to: "/log-health",
    bg: "bg-green-600",
    hover: "hover:bg-green-700",
  },
  {
    label: "Book Consultation",
    icon: <Users size={18} />,
    to: "/doctor-consultations",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
  },
  {
    label: "Ask Health AI",
    icon: <Sparkles size={18} />,
    to: "https://chud-ai.vercel.app/",
    bg: "bg-purple-600",
    hover: "hover:bg-purple-700",
  },
];

// Upcoming Appointments
const upcomingAppointments = [
  { doctor: "Dr. Sita Sharma", time: "Tomorrow, 10:00 AM", type: "Video Call" },
  { doctor: "Dr. Ramesh Thapa", time: "Dec 31, 2:00 PM", type: "In-Clinic" },
];

// Recent Health Reports
const recentReports = [
  { title: "Blood Test Report", date: "Dec 28, 2025" },
  { title: "BMI & Fitness Analysis", date: "Dec 27, 2025" },
  { title: "Sleep & Heart Rate Summary", date: "Dec 26, 2025" },
];

// Nearby Clinics / Labs
const nearbyClinics = [
  { name: "HealthPlus Clinic", distance: "0.5 km away", img: 101 },
  { name: "Wellness Lab", distance: "1.2 km away", img: 102 },
  { name: "City Hospital", distance: "2 km away", img: 103 },
];

// Doctors Online Now
const onlineDoctors = [201, 202, 203, 204, 205];

export default function RightSidebar() {
  return (
    <aside className="hidden lg:block w-80 h-screen sticky top-16 overflow-y-auto pl-4 py-4 bg-white rounded-2xl shadow-sm">
      {/* QUICK ACTIONS */}
      <section className="space-y-3 mb-6">
        <h2 className="font-semibold text-gray-700">Quick Actions</h2>
        <div className="flex flex-col gap-3">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              to={action.to}
              className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg ${action.bg} ${action.hover} transition`}
            >
              {action.icon} {action.label}
            </Link>
          ))}
        </div>
      </section>

      {/* UPCOMING APPOINTMENTS */}
      <section className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">
          Upcoming Appointments
        </h2>
        <div className="space-y-3">
          {upcomingAppointments.map((appt, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition cursor-pointer"
            >
              <h3 className="font-medium text-gray-800">{appt.doctor}</h3>
              <p className="text-sm text-gray-500">
                {appt.time} — {appt.type}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT HEALTH REPORTS */}
      <section className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">Recent Reports</h2>
        <div className="space-y-3">
          {recentReports.map((report, idx) => (
            <div
              key={idx}
              className="p-3 bg-white shadow-sm border rounded-lg hover:bg-gray-50 cursor-pointer transition"
            >
              <h4 className="font-medium text-gray-800">{report.title}</h4>
              <p className="text-sm text-gray-500">{report.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEARBY CLINICS / LABS */}
      <section className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">
          Nearby Clinics / Labs
        </h2>
        <div className="space-y-3">
          {nearbyClinics.map((clinic, id) => (
            <div
              key={id}
              className="flex items-center gap-3 p-3 bg-white shadow-sm border rounded-lg hover:bg-gray-50 cursor-pointer transition"
            >
              <img
                src={`https://i.pravatar.cc/100?img=${(id % 70) + 1}`}
                alt={clinic.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-medium text-gray-800">{clinic.name}</h4>
                <p className="text-sm text-gray-500">{clinic.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORS ONLINE NOW */}
      <section className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-3">Doctors Online</h2>
        <div className="flex flex-wrap gap-3">
          {onlineDoctors.map((id) => (
            <div key={id} className="relative">
              <img
                src={`https://i.pravatar.cc/100?img=${(id % 70) + 1}`}
                className="w-12 h-12 rounded-full"
                alt="Doctor"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
