import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // <-- import

import {
  Home,
  PlusCircle,
  Bell,
  MessageSquare,
  Users,
  MapPin,
  Settings,
  List,
  Bookmark,
  Wallet,
  LifeBuoy,
  Sparkles,
} from "lucide-react";

const menuItems = [
  {
    name: "Home",
    icon: <Home size={24} />,
    path: "/home",
    classname: "text-blue-500",
  },
  {
    name: "Ask AI",
    icon: <Sparkles size={24} />,
    path: "/ai",
    classname: "text-blue-500",
  },
  {
    name: "Post Help",
    icon: <PlusCircle size={24} />,
    path: "/create",
    classname: "text-indigo-700",
  },
  {
    name: "Alerts",
    icon: <Bell size={24} />,
    path: "/alerts",
    classname: "text-blue-700",
  },
  {
    name: "Messages",
    icon: <MessageSquare size={24} />,
    path: "/chat",
    classname: "text-sky-700",
  },
  {
    name: "Nearby Helpers",
    icon: <Users size={24} />,
    path: "/helpers",
    classname: "text-blue-700",
  },
  {
    name: "Map",
    icon: <MapPin size={24} />,
    path: "/map",
    classname: "text-blue-700",
  },
  {
    name: "Settings",
    icon: <Settings size={24} />,
    path: "/settings",
    classname: "text-blue-700",
  },
  {
    name: "My Requests",
    icon: <List size={24} />,
    path: "/my-requests",
    classname: "text-blue-700",
  },
  {
    name: "Saved",
    icon: <Bookmark size={24} />,
    path: "/saved",
    classname: "text-blue-700",
  },
  {
    name: "Wallet",
    icon: <Wallet size={24} />,
    path: "/wallet",
    classname: "text-blue-700",
  },
  {
    name: "Support",
    icon: <LifeBuoy size={24} />,
    path: "/support",
    classname: "text-blue-700",
  },
];

export default function LeftSidebar() {
  const { user } = useAuth();
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky left-0 top-16 bg-whiter rounded-2xl border-gray-200 p-4">
      <div className="mb-4 px-2 flex items-center gap-3">
        <img
          src={user.profilePic}
          alt="profile"
          className="w-6 h-6 rounded-full object-cover bg-gray-100"
        />
        <h1 className="text-lg font-semibold text-indigo-600 ">{user.name}</h1>
      </div>

      {/* Menu */}
      <nav className="overflow-y-auto space-y-4 mt-3 ">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-md hover:cursor-pointer hover:bg-gray-200 text-gray-700 transition-all ${
                isActive ? "font-bold text-indigo-600" : ""
              }`
            }
          >
            <span className={item.classname}>{item.icon}</span>
            <span className="text-md font-semibold">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
