import { useState } from "react";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reminders: true,
    healthAlerts: true,
    promotional: false,
  });

  const toggle = (key) =>
    setNotifications((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>

      {Object.entries(notifications).map(([key, value]) => (
        <div key={key} className="flex justify-between p-4 border rounded-lg mb-4">
          <span className="capitalize">{key}</span>
          <button
            onClick={() => toggle(key)}
            className={`h-6 w-11 rounded-full ${value ? "bg-indigo-600" : "bg-gray-300"}`}
          />
        </div>
      ))}
    </div>
  );
}
