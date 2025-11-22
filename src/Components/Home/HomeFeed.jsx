// src/Components/Home/HomeFeed.jsx
import React from "react";
import { MessageCircle, Heart, Share2, User } from "lucide-react";

const feedData = [
  {
    id: 1,
    name: "Sujal Rai",
    avatar: null,
    content:
      "Anyone knows a good electrician nearby? My inverter stopped working.",
    time: "5 min ago",
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    name: "Priya Lama",
    avatar: null,
    content: "Feeling stuck with my IT project. Any JavaScript expert here?",
    time: "20 min ago",
    likes: 8,
    comments: 2,
  },
];

export default function HomeFeed() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-3">Community Feed</h2>

      <div className="space-y-6">
        {feedData.map((post) => (
          <div key={post.id} className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User />
              </div>

              <div>
                <p className="font-semibold">{post.name}</p>
                <p className="text-sm text-gray-500">{post.time}</p>
              </div>
            </div>

            <p className="mt-3 text-gray-800">{post.content}</p>

            <div className="flex items-center gap-6 mt-4 text-gray-600">
              <button className="flex items-center gap-2 hover:text-red-500">
                <Heart size={18} /> {post.likes}
              </button>

              <button className="flex items-center gap-2 hover:text-blue-500">
                <MessageCircle size={18} /> {post.comments}
              </button>

              <button className="flex items-center gap-2 hover:text-green-600">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
