import { NavLink } from "react-router-dom";
import { PlusCircle, Edit, HelpCircle } from "lucide-react";

export default function PostHelpLeftSidebar() {
  const items = [
    { name: "Create New", icon: <PlusCircle />, to: "/create" },
    { name: "My Posts", icon: <Edit />, to: "/post-help/my-posts" },
    { name: "Help Topics", icon: <HelpCircle />, to: "/post-help/topics" },
  ];

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-3">Post Help</h2>

      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
              isActive ? "bg-gray-200 font-medium" : ""
            }`
          }
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}
