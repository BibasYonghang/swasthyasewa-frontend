import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Home,
  PlusCircle,
  Bell,
  MessageSquare,
  Users,
  Settings,
  List,
  Bookmark,
  Wallet,
  LifeBuoy,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import UserAvatar from "../../../Components/Shared/UserAvatar";

const menuItems = [
  {
    name: "Dashboard",
    icon: <Home size={24} />,
    path: "/dashboard",
    classname: "text-blue-500",
  },
  {
    name: "Health Tests",
    icon: <List size={24} />,
    path: "/health-test",
    classname: "text-green-500",
  },
  {
    name: "My Reports",
    icon: <Bookmark size={24} />,
    path: "/my-reports",
    classname: "text-yellow-500",
  },
  {
    name: "Doctor Consultations",
    icon: <Users size={24} />,
    path: "/doctor-consultations",
    classname: "text-purple-500",
  },
  {
    name: "Personal Plans",
    icon: <PlusCircle size={24} />,
    path: "/personal-plans",
    classname: "text-indigo-700",
  },
  {
    name: "Wallet",
    icon: <Wallet size={24} />,
    path: "/wallet",
    classname: "text-orange-500",
  },
  {
    name: "Settings",
    icon: <Settings size={24} />,
    path: "/settings",
    classname: "text-gray-700",
  },
  {
    name: "Find Doctors",
    icon: <Stethoscope size={24} />,
    path: "/doctors",
    classname: "text-teal-500",
  },
];

export default function LeftSidebar() {
  const loggedInUser = useSelector((state) => state.auth.user);

  return (
    <aside className="hidden lg:flex noscroll-bar  overflow-y-auto    h-screen flex-col w-64 bg-white sticky left-0 bg-whiter rounded-2xl border-gray-200 py-2 px-4">
      {/* User Profile */}
      <div className="mb-4 px-2 flex items-center gap-3">
        <UserAvatar user={loggedInUser} size={10} />
        <h1 className="text-lg font-semibold text-indigo-600">
          {loggedInUser?.name || "Guest"}
        </h1>
      </div>

      {/* Sidebar Menu */}
      <nav className="overflow-y-auto space-y-4 mt-3">
        {menuItems.map((item) =>
          item.name === "Ask AI" ? (
            <a
              key={item.name}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-all"
            >
              <span className={item.classname}>{item.icon}</span>
              <span className="text-md font-semibold">{item.name}</span>
            </a>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-all ${
                  isActive ? "font-bold text-indigo-600" : ""
                }`
              }
            >
              <span className={item.classname}>{item.icon}</span>
              <span className="text-md font-semibold">{item.name}</span>
            </NavLink>
          ),
        )}
      </nav>
    </aside>
  );
}
