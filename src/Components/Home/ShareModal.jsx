import React, { useState } from "react";
import { shareToTimeline } from "../../api/posts";

export default function ShareModal({ post, close }) {
  const [shareComment, setShareComment] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await shareToTimeline(post._id, shareComment);
      alert("Shared to your timeline!");
      close();
    } catch (error) {
      alert("Failed to share. Try again!");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay with blur */}
      <div className="absolute inset-0  bg-gray-400 opacity-70 backdrop-blur-sm"></div>

      {/* Modal card */}
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Share Post</h3>
          <button
            onClick={close}
            className="text-gray-600 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2"
          >
            ✖
          </button>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          placeholder="Say something about this post..."
          value={shareComment}
          onChange={(e) => setShareComment(e.target.value)}
          disabled={isSharing}
        />

        {/* Share button */}
        <button
          onClick={handleShare}
          disabled={isSharing}
          className={`w-full p-3 rounded-lg text-white ${
            isSharing
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSharing ? "Sharing..." : "Share to your timeline"}
        </button>
      </div>
    </div>
  );
}
