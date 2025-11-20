import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4">
      <div className="text-xl font-bold">LifeAssistant</div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search posts or helpers..."
          className="border rounded px-3 py-1 focus:outline-none focus:ring"
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          Notifications
        </button>
      </div>
    </nav>
  );
}
