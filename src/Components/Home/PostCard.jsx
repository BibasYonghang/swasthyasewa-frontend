// src/Components/Home/PostCard.jsx
import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <img
          src="/default-user.png"
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-semibold">Anonymous</h4>
          <p className="text-sm text-gray-500">{post.timeAgo}</p>
        </div>
      </div>
      <p className="text-gray-700">{post.text}</p>
      {post.image && (
        <img
          src={post.image}
          alt=""
          className="mt-3 w-full h-64 object-cover rounded-xl"
        />
      )}
    </div>
  );
}
