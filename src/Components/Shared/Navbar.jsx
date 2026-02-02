import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  MapPinned,
  Sparkles,
  Menu,
  Search,
  User,
  LogOut,
  Settings,
  Home,
  Video,
  MessageCircle,
  ChevronDown,
  X,
  HeartPulse,
  Stethoscope,
  HelpCircle,
} from "lucide-react";
import { scrollToTop } from "../../utils/scrollToTop.js";
import { useSelector } from "react-redux";
import UserAvatar from "./UserAvatar.jsx";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!currentUser || !currentUser._id) {
    return null;
  }

  const notifications = [
    {
      id: 1,
      text: "Your lab report is ready",
      time: "10 min ago",
      unread: true,
    },
    {
      id: 2,
      text: "Dr. Smith confirmed your appointment",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      text: "New clinic opened nearby",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: 4,
      text: "Health tips: Stay hydrated",
      time: "1 day ago",
      unread: false,
    },
  ];

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200 px-3 xl:px-0 py-2 h-14">
        <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              type="button"
              aria-label="Scroll To Top"
              className="flex items-center hover:cursor-pointer gap-2 min-w-fit"
            >
              <img
                src="/swasthyasewa-logo.png"
                alt="HealthConnect Logo"
                className="h-9 w-9 object-contain rounded-full"
              />
            </button>

            <div className="hidden lg:flex items-center max-w-md">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="search"
                  placeholder="Search doctors, labs, reports..."
                  className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center lg:ml-[3vw]  xl:ml-[9vw]">
            <div className="flex items-center h-full space-x-7">
              <Link
                to="/home"
                onClick={scrollToTop}
                className="flex items-center justify-center h-10 px-3  rounded-lg hover:bg-gray-100 transition-colors border-b-2 border-transparent hover:border-blue-500"
              >
                <Home size={24} className="text-gray-600" />
              </Link>

              <Link
                to="/nearby-clinics"
                className="flex items-center justify-center h-10 px-3  rounded-lg hover:bg-gray-100 transition-colors border-b-2 border-transparent hover:border-blue-500"
              >
                <MapPinned size={24} className="text-gray-600" />
              </Link>
              <a
                href="https://chud-ai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 px-3  rounded-lg hover:bg-gray-100 transition-colors border-b-2 border-transparent hover:border-purple-500"
              >
                <Sparkles size={24} className="text-gray-600" />
              </a>

              <Link
                to="/messages"
                className="flex items-center relative justify-center h-10 px-3  rounded-lg hover:bg-gray-100 transition-colors border-b-2 border-transparent hover:border-sky-500"
                aria-label="Messages"
              >
                <MessageCircle size={22} className="text-gray-600" />
                <span className="absolute hidden -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5  items-center justify-center rounded-full">
                  2
                </span>
              </Link>

              {/* Notifications Dropdown */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="flex items-center justify-center h-10 px-3 hover:cursor-pointer rounded-lg hover:bg-gray-100 transition-colors border-b-2 border-transparent hover:border-red-500"
                  aria-label="Notifications"
                >
                  <Bell size={22} className="text-gray-600" />
                  <span className="absolute hidden -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 items-center justify-center rounded-full">
                    3
                  </span>
                </button>

                {/* Notifications Dropdown Menu */}
                {notificationsOpen && (
                  <div className="absolute right-0 ml-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <Link
                          key={notification.id}
                          to="/notifications"
                          className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.unread
                                ? "bg-blue-500"
                                : "bg-transparent"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-800">
                              {notification.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100">
                      <Link
                        to="/notifications"
                        className="text-blue-600 text-sm font-medium hover:text-blue-800 block text-center"
                      >
                        See all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end sm:gap-2  flex-1">
            {/* Mobile Search Button */}
            <button
              className="lg:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={22} />
            </button>

            <Link
              to="/home"
              onClick={scrollToTop}
              className="flex lg:hidden items-center justify-center h-10 px-3 rounded-lg hover:bg-gray-100 transition-colors border-b-2 border-transparent hover:border-blue-500"
            >
              <Home size={24} className="text-gray-600" />
            </Link>

            <Link
              to="/messages"
              className="flex lg:hidden  items-center relative justify-center h-10 px-3  rounded-lg hover:bg-gray-100 transition-colors border-b-2 border-transparent hover:border-sky-500"
              aria-label="Messages"
            >
              <MessageCircle size={22} className="text-gray-600" />
              <span className="absolute hidden -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5  items-center justify-center rounded-full">
                2
              </span>
            </Link>

            <Link
              to="/video-consult"
              className="flex items-center justify-center h-10 px-3  rounded-lg hover:bg-gray-100 transition-colors border-b-2 border-transparent hover:border-green-500"
            >
              <Video size={24} className="text-gray-600" />
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative lg:hidden" ref={notificationsRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="flex items-center justify-center h-10 px-3 hover:cursor-pointer rounded-lg hover:bg-gray-100 transition-colors border-b-2 border-transparent hover:border-red-500"
                aria-label="Notifications"
              >
                <Bell size={22} className="text-gray-600" />
                <span className="absolute  hidden -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5  items-center justify-center rounded-full">
                  3
                </span>
              </button>

              {/* Notifications Dropdown Menu */}
              {notificationsOpen && (
                <div className="absolute -right-20 w-80 bg-white shadow-lg rounded-lg border border-gray-200 py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <Link
                        key={notification.id}
                        to="/notifications"
                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.unread
                              ? "bg-blue-500"
                              : "bg-transparent"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">
                            {notification.text}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link
                      to="/notifications"
                      className="text-blue-600 text-sm font-medium hover:text-blue-800 block text-center"
                    >
                      See all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 hover:cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Profile menu"
              >
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <UserAvatar
                    user={currentUser}
                    size={8}
                    className="text-white"
                  />
                </div>
                <ChevronDown
                  size={16}
                  className="text-gray-600 hidden lg:block"
                />
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 py-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h1 className="font-semibold text-gray-800">
                      {currentUser?.name || "Guest"}
                    </h1>
                  </div>

                  <Link
                    to={`/profile/${currentUser._id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <User size={18} className="text-gray-600" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <Settings size={18} className="text-gray-600" />
                    <span>Settings & Privacy</span>
                  </Link>

                  <Link
                    to="/support"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <HelpCircle size={18} className="text-gray-600" />
                    <span>Help & Support</span>
                  </Link>

                  <div className="border-t border-gray-100 my-2"></div>

                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-red-600"
                  >
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden hover:cursor-pointer  p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden px-4 py-3 border-t  border-gray-200">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="search"
                placeholder="Search doctors, labs, reports..."
                className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Side Menu  */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl">
            {/* Header */}
            <div className="p-4 border-b flex items-center  border-gray-200 bg-linear-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Link
                    to={`/profile/${currentUser._id}`}
                    className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                  >
                    <UserAvatar
                      user={currentUser}
                      size={12}
                      fallbackToRedux={true}
                    />
                  </Link>
                  <div>
                    <p className="font-bold w-48 text-gray-900">
                      {currentUser?.name || "You"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:cursor-pointer hover:bg-gray-200"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Main Navigation Section */}
            <div className="overflow-y-auto h-[calc(100%-180px)] ">
              <div className="py-3">
                <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Health Navigation
                </h3>
                <div className="space-y-1">
                  <Link
                    to="/home"
                    onClick={scrollToTop}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-blue-600"
                  >
                    <Home size={22} />
                    <span className="font-medium">Home</span>
                  </Link>

                  <Link
                    to="/nearby-clinics"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <MapPinned size={22} className="text-blue-500" />
                    <span className="font-medium">Nearby Clinics</span>
                  </Link>

                  <a
                    href="https://chud-ai.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <Sparkles size={22} className="text-purple-500" />
                    <span className="font-medium">Health AI Assistant</span>
                  </a>

                  <Link
                    to="/video-consult"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <Video size={22} className="text-green-500" />
                    <span className="font-medium">Video Consult</span>
                  </Link>

                  <Link
                    to="/messages"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <MessageCircle size={22} className="text-blue-400" />
                    <span className="font-medium">Messages</span>
                    <span className="ml-auto bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      2
                    </span>
                  </Link>
                </div>
              </div>

              {/* Medical Services */}
              <div className="py-3 border-t border-gray-100">
                <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Medical Services
                </h3>
                <div className="space-y-1">
                  <Link
                    to="/doctors"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <Stethoscope size={22} className="text-teal-500" />
                    <span className="font-medium">Find Doctors</span>
                  </Link>

                  <Link
                    to="/medications"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <HeartPulse size={22} className="text-red-500" />
                    <span className="font-medium">Medications</span>
                  </Link>
                </div>
              </div>

              {/* Account & Settings */}
              <div className="py-3 border-t border-gray-100">
                <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Account & Settings
                </h3>
                <div className="space-y-1">
                  <Link
                    to={`/profile/${currentUser._id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <User size={22} className="text-gray-600" />
                    <span className="font-medium">My Profile</span>
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <Settings size={22} className="text-gray-600" />
                    <span className="font-medium">Settings</span>
                  </Link>

                  <Link
                    to="/support"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <HelpCircle size={22} className="text-gray-600" />
                    <span className="font-medium">Help & Support</span>
                  </Link>
                </div>
              </div>

              {/* Logout */}
              <div className="pt-3 border-t border-gray-200">
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-red-600"
                >
                  <LogOut size={22} />
                  <span className="font-medium">Log Out</span>
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50 px-2 py-8">
              <div className="flex items-center justify-center space-x-4">
                <Link
                  to="/privacy"
                  className="text-xs text-gray-600 hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  to="/terms"
                  className="text-xs text-gray-600 hover:text-blue-600"
                >
                  Terms of Service
                </Link>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-600">v2.1.4</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-14 lg:h-14"></div>
    </>
  );
}
