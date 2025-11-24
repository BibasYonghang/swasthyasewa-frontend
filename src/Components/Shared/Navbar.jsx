import React, { useState } from "react";
import {
  Bell,
  MapPinned,
  Sparkles,
  Menu,
  Search,
  AlertCircle,
  MessageCircle,
  User,
  LogOut,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between bg-white shadow-md px-3 py-2 h-16 fixed top-0 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/neighborly-logo.png"
            alt="Neighborly"
            className="h-12 w-12 object-contain"
          />
        </div>

        {/* Search */}
        <div className="flex items-center w-[55vw] sm:w-[60vw] md:w-[28vw] xl:w-[35vw]">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Neighborly"
              className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex items-center gap-4">
        {/* AI Assistant */}
        <button className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition">
          <Sparkles size={18} />
          <span className="hidden md:block">Ask AI</span>
        </button>

        {/* Alerts */}
        <button className="hidden md:flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
          <AlertCircle size={18} />
          Alerts
        </button>

        {/* Community Feed */}
        <button className="hidden md:flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
          <MessageCircle size={18} />
          Community
        </button>

        {/* Nearby Map */}
        <button className="hidden md:flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
          <MapPinned size={18} />
          Nearby
        </button>

        {/* Notifications */}
        <button className="relative bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-600 transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <div
          className="relative hidden md:block"
          onMouseLeave={() => setProfileOpen(false)}
        >
          <button
            onMouseEnter={() => setProfileOpen(true)}
            className="bg-gray-200 rounded-full p-2 cursor-pointer"
          >
            <User size={20} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2">
              <button className="flex w-full px-4 py-2 hover:bg-gray-100 gap-2">
                <User size={16} /> Profile
              </button>
              <button className="flex w-full px-4 py-2 hover:bg-gray-100 gap-2">
                <Settings size={16} /> Settings
              </button>
              <button className="flex w-full px-4 py-2 hover:bg-gray-100 gap-2">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
      </div>
      <Menu
        className="lg:hidden flex cursor-pointer"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col p-4 gap-3 lg:hidden">
          <button className="flex items-center gap-2">
            <Sparkles size={18} /> Ask AI
          </button>
          <button className="flex items-center gap-2">
            <AlertCircle size={18} /> Alerts
          </button>
          <button className="flex items-center gap-2">
            <MessageCircle size={18} /> Community Feed
          </button>
          <button className="flex items-center gap-2">
            <MapPinned size={18} /> Nearby Map
          </button>
          <button className="flex items-center gap-2">
            <Bell size={18} /> Notifications
          </button>
          <button className="flex items-center gap-2">
            <User size={18} /> Profile
          </button>
        </div>
      )}
    </nav>
  );
}
