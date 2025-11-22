import React from "react";
import { Bell, MapPinned, Sparkles, Menu, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <Menu className="md:hidden cursor-pointer" />
        <div className="text-2xl font-bold text-blue-600">Neighborly</div>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex items-center w-1/2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search issues, helpers, or solutions..."
            className="w-full border rounded-full py-2 pl-10 pr-4 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        {/* AI Assistant */}
        <button className="flex items-center hover:cursor-pointer gap-1 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition">
          <Sparkles size={18} />
          <span className="hidden md:block">Ask AI</span>
        </button>

        {/* Nearby Map */}
        <button className="hidden md:flex hover:cursor-pointer items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
          <MapPinned size={18} />
          Map
        </button>

        {/* Notifications */}
        <button className="relative bg-blue-500 hover:cursor-pointer text-white px-3 py-2 rounded-full hover:bg-blue-600 transition">
          <Bell size={20} />
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer"></div>
      </div>
    </nav>
  );
}
