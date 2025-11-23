// src/Components/Layout/RightSidebar.jsx
import React from "react";
import {
  AlertCircle,
  Users,
  Sparkles,
  MessageCircle,
  Plus,
} from "lucide-react";

export default function RightSidebar() {
  return (
    <aside className="hidden lg:block rounded-2xl w-80 h-screen sticky top-16 overflow-y-auto p-4 bg-white shadow-sm">
      {/* QUICK ACTIONS */}
      <div className="space-y-3 mb-6">
        <h2 className="font-semibold text-gray-700">Quick Actions</h2>
        <div className="flex flex-col gap-3">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <Plus size={18} /> Create Post
          </button>

          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            <AlertCircle size={18} /> Alerts
          </button>

          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            <Sparkles size={18} /> Ask AI
          </button>
        </div>
      </div>

      {/* TRENDING HELP REQUESTS */}
      <div className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">Trending Requests</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition cursor-pointer"
            >
              <h3 className="font-medium text-gray-800">
                {item === 1
                  ? "Urgent: Fire incident reported nearby!"
                  : item === 2
                  ? "Looking for a plumber around your area"
                  : "Lost mobile phone near city mall"}
              </h3>
              <p className="text-sm text-gray-500">2 min ago</p>
            </div>
          ))}
        </div>
      </div>

      {/* NEARBY HELPERS */}
      <div className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">Nearby Helpers</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((user) => (
            <div
              key={user}
              className="flex items-center gap-3 p-3 bg-white shadow-sm border rounded-lg hover:bg-gray-50 cursor-pointer transition"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${user + 10}`}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-medium text-gray-800">
                  {user === 1
                    ? "Hari (Electrician)"
                    : user === 2
                    ? "Suman (Plumber)"
                    : "Rita (Nurse)"}
                </h4>
                <p className="text-sm text-gray-500">0.{user} km away</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUGGESTED COMMUNITIES */}
      <div className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">
          Suggested Communities
        </h2>
        <ul className="space-y-2">
          <li className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
            <span>Lost & Found</span>
            <MessageCircle size={18} />
          </li>
          <li className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
            <span>Local Volunteers</span>
            <Users size={18} />
          </li>
          <li className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
            <span>Emergency Helpers</span>
            <AlertCircle size={18} />
          </li>
        </ul>
      </div>

      {/* ACTIVE USERS */}
      <div className="mb-8">
        <h2 className="font-semibold text-gray-700 mb-3">Active Now</h2>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="relative">
              <img
                src={`https://i.pravatar.cc/100?img=${n + 20}`}
                className="w-12 h-12 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
