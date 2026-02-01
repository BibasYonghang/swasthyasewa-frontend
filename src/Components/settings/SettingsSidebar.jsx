import { NavLink } from "react-router-dom";
import { User, Bell, Shield, Palette, Download } from "lucide-react";

const links = [
  { to: "profile", label: "Profile", icon: <User size={20} /> },
  { to: "notifications", label: "Notifications", icon: <Bell size={20} /> },
  { to: "security", label: "Security", icon: <Shield size={20} /> },
  { to: "appearance", label: "Appearance", icon: <Palette size={20} /> },
  { to: "data", label: "Data Management", icon: <Download size={20} /> },
];

export default function SettingsSidebar() {
  return (
    <aside className="lg:w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
