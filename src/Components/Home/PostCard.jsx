// src/Components/Home/PostCard.jsx
import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="bg-white shadow-md rounded-xl text-black p-4 mb-4">
      {/* Top section: profile */}
      <div className="flex items-center gap-3 mb-3">
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

      {/* Text content */}
      {post.text && (
        <p className="text-gray-800 mb-3 whitespace-pre-line leading-relaxed">
          {post.text}
        </p>
      )}

      {/* Image (height auto, adjusts dynamically like Facebook) */}
      {post.image && (
        <img
          src={post.image}
          alt=""
          className="w-full rounded-xl object-cover"
        />
      )}
    </div>
  );
}
