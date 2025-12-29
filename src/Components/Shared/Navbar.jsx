import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md px-3 py-2 h-16">
      <div className="flex items-center justify-between h-full">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <img
              src="/swasthyasewa-logo.png"
              alt="Neighborly Logo"
              className="h-12 w-12 object-contain"
            />
          </Link>

          {/* Search */}
          <div className="relative w-[72vw] sm:w-[80vw] md:w-[31vw] xl:w-[45vw]">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="search"
              placeholder="Search Neighborly"
              aria-label="Search Neighborly"
              className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* RIGHT */}
        <ul className="hidden lg:flex items-center gap-4">
          {/* AI Assistant */}
          <li>
            <a
              href="https://chud-ai.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
            >
              <Sparkles size={18} />
              <span className="hidden md:block">Ask AI</span>
            </a>
          </li>

          {/* Alerts */}
          <li>
            <Link
              to="/alerts"
              className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
            >
              <AlertCircle size={18} />
              <span className="hidden md:block">Alerts</span>
            </Link>
          </li>

          {/* Community Feed */}
          <li>
            <Link
              to="/community"
              className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
            >
              <MessageCircle size={18} />
              <span className="hidden md:block">Community</span>
            </Link>
          </li>

          {/* Nearby Map */}
          <li>
            <Link
              to="/map"
              className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              <MapPinned size={18} />
              <span className="hidden md:block">Nearby</span>
            </Link>
          </li>

          {/* Notifications */}
          <li className="relative">
            <Link
              to="/notifications"
              className="bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-600 transition flex items-center"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </Link>
          </li>

          {/* Profile Dropdown */}
          <li className="relative" onMouseLeave={() => setProfileOpen(false)}>
            <button
              onMouseEnter={() => setProfileOpen(true)}
              aria-haspopup="true"
              aria-expanded={profileOpen}
              className="bg-gray-200 rounded-full p-2 cursor-pointer"
            >
              <User size={20} />
            </button>

            {profileOpen && (
              <ul
                className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2"
                role="menu"
              >
                <li>
                  <Link
                    to="/profile"
                    className="flex w-full px-4 py-2 hover:bg-gray-100 gap-2"
                    role="menuitem"
                  >
                    <User size={16} /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="flex w-full px-4 py-2 hover:bg-gray-100 gap-2"
                    role="menuitem"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="flex w-full px-4 py-2 hover:bg-gray-100 gap-2"
                    role="menuitem"
                  >
                    <LogOut size={16} /> Logout
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden ml-5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open Mobile Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col p-4 gap-3 lg:hidden">
          <li>
            <a
              href="https://chud-ai.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Sparkles size={18} /> Ask AI
            </a>
          </li>
          <li>
            <Link to="/alerts" className="flex items-center gap-2">
              <AlertCircle size={18} /> Alerts
            </Link>
          </li>
          <li>
            <Link to="/community" className="flex items-center gap-2">
              <MessageCircle size={18} /> Community Feed
            </Link>
          </li>
          <li>
            <Link to="/map" className="flex items-center gap-2">
              <MapPinned size={18} /> Nearby Map
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="flex items-center gap-2">
              <Bell size={18} /> Notifications
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center gap-2">
              <User size={18} /> Profile
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
