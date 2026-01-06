import React, { useState } from "react";
import PostHelpLeftSidebar from "./sidebar/left/Post.jsx";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

export default function PostsLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 sticky top-16 h-screen">
        <PostHelpLeftSidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white w-64 h-full p-4">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="mb-4"
            >
              Close
            </button>
            <PostHelpLeftSidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className=" p-4">
        {/* Mobile hamburger button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Menu size={20} /> Menu
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
