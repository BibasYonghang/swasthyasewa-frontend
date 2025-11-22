// src/Components/Home/Alerts.jsx
import React from "react";
import { Bell, AlertCircle } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "emergency",
    title: "Fire incident reported nearby!",
    time: "2 min ago",
    color: "bg-red-100 text-red-700",
    icon: <AlertCircle size={20} />,
  },
  {
    id: 2,
    type: "info",
    title: "System update: New helper matching feature added.",
    time: "1 hr ago",
    color: "bg-blue-100 text-blue-700",
    icon: <Bell size={20} />,
  },
];

export default function Alerts() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-3">Alerts</h2>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg flex items-center gap-3 ${alert.color}`}
          >
            <div>{alert.icon}</div>
            <div className="flex-1">
              <p className="font-medium">{alert.title}</p>
              <p className="text-sm opacity-70">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
