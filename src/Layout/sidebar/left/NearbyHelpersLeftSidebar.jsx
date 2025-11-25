import { NavLink } from "react-router-dom";
import { Users, MapPin, Star } from "lucide-react";

export default function NearbyHelpersLeftSidebar() {
  const items = [
    { name: "Nearby Helpers", icon: <Users />, to: "/helpers" },
    { name: "Top Rated", icon: <Star />, to: "/helpers/top" },
    { name: "Map View", icon: <MapPin />, to: "/helpers/map" },
  ];

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-3">Helpers</h2>

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
