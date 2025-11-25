import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  List,
  Users,
  Bookmark,
  PlusCircle,
  Settings,
} from "lucide-react";

export default function CommunityLeftSidebar() {
  const menuItems = [
    { name: "Home", icon: <Home size={18} />, path: "/home" },
    { name: "My Posts", icon: <List size={18} />, path: "/community/myposts" },
    { name: "Explore", icon: <Users size={18} />, path: "/community/explore" },
    { name: "Saved", icon: <Bookmark size={18} />, path: "/saved" },
    {
      name: "Create Post",
      icon: <PlusCircle size={18} />,
      path: "/create-post",
    },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r shadow-sm p-4 sticky top-16">
      <h2 className="text-lg font-semibold mb-6">Community</h2>
      <nav>
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
