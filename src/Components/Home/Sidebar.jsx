// src/components/Home/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  const categories = ["Health", "Study", "Travel", "Finance", "Technology"];
  return (
    <aside className="w-64 bg-white p-4 shadow-md">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            {cat}
          </li>
        ))}
      </ul>
      <button className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Create Post
      </button>
    </aside>
  );
};

export default Sidebar;
