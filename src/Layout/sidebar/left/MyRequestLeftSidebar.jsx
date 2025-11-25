import { NavLink } from "react-router-dom";
import { List, Clock, CheckCircle2 } from "lucide-react";

export default function MyRequestsLeftSidebar() {
  const items = [
    { name: "All Requests", icon: <List />, to: "/my-requests" },
    { name: "Pending", icon: <Clock />, to: "/my-requests/pending" },
    { name: "Completed", icon: <CheckCircle2 />, to: "/my-requests/completed" },
  ];

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-3">My Requests</h2>

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
