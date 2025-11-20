// src/pages/PostCreationPage.jsx
import React, { useState } from "react";
import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Home/Sidebar";
import axios from "axios";

const PostCreation = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Health");
  const [media, setMedia] = useState(null);
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("category", category);
    formData.append("isUrgent", isUrgent);
    if (media) formData.append("media", media);

    await axios.post("/api/posts", formData);
    setText("");
    setMedia(null);
    setIsUrgent(false);
    alert("Post created!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe your problem..."
              className="w-full p-2 border rounded focus:outline-none focus:ring"
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring"
            >
              <option>Health</option>
              <option>Study</option>
              <option>Travel</option>
              <option>Finance</option>
              <option>Technology</option>
            </select>
            <input type="file" onChange={(e) => setMedia(e.target.files[0])} />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
              />
              Mark as urgent
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default PostCreation
