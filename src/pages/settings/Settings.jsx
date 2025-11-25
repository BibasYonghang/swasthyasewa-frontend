import React from "react";
import { Link } from "react-router-dom";
import { User, Lock, Bell, CreditCard, HelpCircle, MapPin } from "lucide-react";

const settingsSections = [
  { name: "Account", icon: <User size={24} />, path: "/settings/account" },
  { name: "Privacy", icon: <Lock size={24} />, path: "/settings/privacy" },
  {
    name: "Notifications",
    icon: <Bell size={24} />,
    path: "/settings/notifications",
  },
  {
    name: "Wallet & Payments",
    icon: <CreditCard size={24} />,
    path: "/settings/wallet",
  },
  {
    name: "Location & Map",
    icon: <MapPin size={24} />,
    path: "/settings/location",
  },
  {
    name: "Help & Support",
    icon: <HelpCircle size={24} />,
    path: "/settings/help",
  },
];

export default function Settings() {
  return (
    <div className="min-h-screen mt-16 bg-gray-50 p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section) => (
          <Link
            key={section.name}
            to={section.path}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:bg-indigo-50 transition-all"
          >
            <span className="text-indigo-600">{section.icon}</span>
            <span className="text-lg font-semibold">{section.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
