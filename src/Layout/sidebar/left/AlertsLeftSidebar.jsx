import { NavLink } from "react-router-dom";
import { Bell, AlertTriangle, MessageCircle } from "lucide-react";

export default function AlertsLeftSidebar() {
  const items = [
    { name: "All Alerts", icon: <Bell />, to: "/alerts" },
    { name: "Warnings", icon: <AlertTriangle />, to: "/alerts/warnings" },
    { name: "Mentions", icon: <MessageCircle />, to: "/alerts/mentions" },
  ];

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-3">Alerts</h2>

      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
              isActive ? "bg-gray-200 font-medium" : ""
            }`
          }
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}
