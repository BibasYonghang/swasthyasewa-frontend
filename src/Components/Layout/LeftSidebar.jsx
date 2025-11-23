import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Bell,
  MessageSquare,
  Users,
  MapPin,
  User,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Home", icon: <Home size={22} />, path: "/home" },
  { name: "Post Help", icon: <PlusCircle size={22} />, path: "/create" },
  { name: "Alerts", icon: <Bell size={22} />, path: "/alerts" },
  { name: "Messages", icon: <MessageSquare size={22} />, path: "/chat" },
  { name: "Nearby Helpers", icon: <Users size={22} />, path: "/helpers" },
  { name: "Map", icon: <MapPin size={22} />, path: "/map" },
  { name: "Profile", icon: <User size={22} />, path: "/profile" },
  { name: "Settings", icon: <Settings size={22} />, path: "/settings" },
];

export default function LeftSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky left-0 top-16 bg-whiter rounded-2xl border-gray-200 p-4">
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-indigo-600">Neighborly</h1>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all ${
                isActive ? "bg-gray-100 font-semibold text-indigo-600" : ""
              }`
            }
          >
            {item.icon}
            <span className="text-[15px]">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
