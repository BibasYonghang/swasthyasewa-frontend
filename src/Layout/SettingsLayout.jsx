import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { User, Lock, Bell, CreditCard, HelpCircle, MapPin } from "lucide-react";

const settingsSections = [
  { name: "Account", icon: <User size={20} />, path: "/settings/account" },
  { name: "Privacy", icon: <Lock size={20} />, path: "/settings/privacy" },
  {
    name: "Notifications",
    icon: <Bell size={20} />,
    path: "/settings/notifications",
  },
  {
    name: "Wallet & Payments",
    icon: <CreditCard size={20} />,
    path: "/settings/wallet",
  },
  {
    name: "Location & Map",
    icon: <MapPin size={20} />,
    path: "/settings/location",
  },
  {
    name: "Help & Support",
    icon: <HelpCircle size={20} />,
    path: "/settings/help",
  },
];

export default function SettingsLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-4 sticky top-0 h-screen">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        {settingsSections.map((section) => (
          <NavLink
            key={section.name}
            to={section.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-all ${
                isActive
                  ? "bg-indigo-100 font-semibold text-indigo-600"
                  : "text-gray-700"
              }`
            }
          >
            <span>{section.icon}</span>
            <span>{section.name}</span>
          </NavLink>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
