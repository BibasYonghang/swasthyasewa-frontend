// src/Components/Home/CreatePost.jsx
import React, { useState } from "react";
import { Image, MapPin, Send } from "lucide-react";

export default function CreatePost() {
  const [postText, setPostText] = useState("");

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex items-start gap-3">
        <img
          src="/default-user.png"
          alt="User"
          className="w-10 h-10 rounded-full"
        />

        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Describe the help you need..."
          className="w-full bg-gray-100 rounded-xl p-3 outline-none resize-none"
          rows="2"
        ></textarea>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4 text-gray-600">
          <button className="flex items-center gap-1 hover:text-blue-500">
            <Image size={18} /> Photo
          </button>

          <button className="flex items-center gap-1 hover:text-green-600">
            <MapPin size={18} /> Location
          </button>
        </div>

        <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition">
          <Send size={16} /> Post
        </button>
      </div>
    </div>
  );
}
