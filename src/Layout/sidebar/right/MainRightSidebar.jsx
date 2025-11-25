// src/Components/Layout/RightSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Users,
  Sparkles,
  MessageCircle,
  Plus,
} from "lucide-react";

const quickActions = [
  {
    label: "Create Post",
    icon: <Plus size={18} />,
    to: "/create-post",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
  },
  {
    label: "Alerts",
    icon: <AlertCircle size={18} />,
    to: "/alerts",
    bg: "bg-red-600",
    hover: "hover:bg-red-700",
  },
  {
    label: "Ask AI",
    icon: <Sparkles size={18} />,
    href: "https://chud-ai.vercel.app/",
    bg: "bg-purple-600",
    hover: "hover:bg-purple-700",
    external: true,
  },
];

const trendingRequests = [
  "Urgent: Fire incident reported nearby!",
  "Looking for a plumber around your area",
  "Lost mobile phone near city mall",
];

const nearbyHelpers = [
  { name: "Hari (Electrician)", distance: "0.1 km away", img: 11 },
  { name: "Suman (Plumber)", distance: "0.2 km away", img: 12 },
  { name: "Rita (Nurse)", distance: "0.3 km away", img: 13 },
];

const suggestedCommunities = [
  { name: "Lost & Found", icon: <MessageCircle size={18} /> },
  { name: "Local Volunteers", icon: <Users size={18} /> },
  { name: "Emergency Helpers", icon: <AlertCircle size={18} /> },
];

const activeUsers = [21, 22, 23, 24, 25, 26];

export default function RightSidebar() {
  return (
    <aside className="hidden lg:block w-80 h-screen sticky top-16 overflow-y-auto pl-4 py-4 bg-white rounded-2xl shadow-sm">
      {/* QUICK ACTIONS */}
      <section className="space-y-3 mb-6">
        <h2 className="font-semibold text-gray-700">Quick Actions</h2>
        <div className="flex flex-col gap-3">
          {quickActions.map((action, idx) =>
            action.external ? (
              <a
                key={idx}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg ${action.bg} ${action.hover} transition`}
              >
                {action.icon} {action.label}
              </a>
            ) : (
              <Link
                key={idx}
                to={action.to}
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg ${action.bg} ${action.hover} transition`}
              >
                {action.icon} {action.label}
              </Link>
            )
          )}
        </div>
      </section>

      {/* TRENDING HELP REQUESTS */}
      <section className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">Trending Requests</h2>
        <div className="space-y-3">
          {trendingRequests.map((req, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition cursor-pointer"
            >
              <h3 className="font-medium text-gray-800">{req}</h3>
              <p className="text-sm text-gray-500">2 min ago</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEARBY HELPERS */}
      <section className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">Nearby Helpers</h2>
        <div className="space-y-3">
          {nearbyHelpers.map((helper, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 bg-white shadow-sm border rounded-lg hover:bg-gray-50 cursor-pointer transition"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${helper.img}`}
                alt={helper.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-medium text-gray-800">{helper.name}</h4>
                <p className="text-sm text-gray-500">{helper.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUGGESTED COMMUNITIES */}
      <section className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">
          Suggested Communities
        </h2>
        <ul className="space-y-2">
          {suggestedCommunities.map((community, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
            >
              <span>{community.name}</span>
              {community.icon}
            </li>
          ))}
        </ul>
      </section>

      {/* ACTIVE USERS */}
      <section className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-3">Active Now</h2>
        <div className="flex flex-wrap gap-3">
          {activeUsers.map((id) => (
            <div key={id} className="relative">
              <img
                src={`https://i.pravatar.cc/100?img=${id}`}
                className="w-12 h-12 rounded-full"
                alt="Active User"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
