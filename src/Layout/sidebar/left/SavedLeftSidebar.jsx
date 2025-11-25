import React from "react";
import { NavLink } from "react-router-dom";
import { Bookmark, Image, Video, Link as LinkIcon } from "lucide-react";

export default function SavedLeftSidebar() {
  const savedCategories = [
    { name: "All", icon: <Bookmark size={20} />, path: "/saved/all" },
    { name: "Images", icon: <Image size={20} />, path: "/saved/images" },
    { name: "Videos", icon: <Video size={20} />, path: "/saved/videos" },
    { name: "Links", icon: <LinkIcon size={20} />, path: "/saved/links" },
  ];
  return (
    <>
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-4 sticky top-0 h-screen">
        <h2 className="text-xl font-bold mb-4">Saved</h2>
        {savedCategories.map((category) => (
          <NavLink
            key={category.name}
            to={category.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-all ${
                isActive
                  ? "bg-indigo-100 font-semibold text-indigo-600"
                  : "text-gray-700"
              }`
            }
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </NavLink>
        ))}
      </aside>
    </>
  );
}
