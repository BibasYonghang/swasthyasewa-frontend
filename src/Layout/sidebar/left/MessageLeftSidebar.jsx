import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function MessagesLeftSidebar() {
  const [search, setSearch] = useState("");

  // Sample conversation list (replace with API data)
  const conversations = [
    {
      id: 1,
      name: "Bibas Yonghang",
      message: "Bro, are you coming?",
      time: "2m",
      avatar: "https://i.pravatar.cc/150?img=1",
      isActive: true,
    },
    {
      id: 2,
      name: "Coding Partner",
      message: "Let's finish the UI today.",
      time: "10m",
      avatar: "https://i.pravatar.cc/150?img=2",
      isActive: false,
    },
    {
      id: 3,
      name: "Travel Guide",
      message: "Your booking is confirmed!",
      time: "1h",
      avatar: "https://i.pravatar.cc/150?img=3",
      isActive: true,
    },
  ];

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h2 className="text-xl font-semibold">Messages</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Messenger"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-100 focus:outline-none"
      />

      {/* Conversation List */}
      <div className="space-y-1">
        {filtered.map((chat) => (
          <NavLink
            key={chat.id}
            to={`/messages/${chat.id}`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            {/* Avatar + Active Dot */}
            <div className="relative">
              <img
                src={chat.avatar}
                className="w-12 h-12 rounded-full object-cover"
              />
              {chat.isActive && (
                <span className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border border-white"></span>
              )}
            </div>

            {/* Name + Message */}
            <div className="flex-1">
              <h3 className="font-medium">{chat.name}</h3>
              <p className="text-sm text-gray-500 truncate">{chat.message}</p>
            </div>

            {/* Time */}
            <span className="text-xs text-gray-400">{chat.time}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
