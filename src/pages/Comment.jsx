import React from "react";
import {
  ThumbsUp,
  MessageCircle,
  Send,
  Smile,
  Image,
  MoreHorizontal,
} from "lucide-react";

export default function Comment() {
  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <div className="max-w-2xl mx-auto">
        {/* Post */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-start gap-3">
            <img
              src="/default-profile.png"
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">Bibas Yonghang</h2>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <MoreHorizontal className="text-gray-600" />
              </div>
              <p className="mt-2 text-gray-800">
                This is an example post, just like how Facebook displays a post
                before comments.
              </p>
            </div>
          </div>

          {/* Reactions */}
          <div className="flex items-center justify-between mt-4 border-t pt-3 text-gray-600 text-sm">
            <button className="flex items-center gap-1">
              <ThumbsUp size={18} /> Like
            </button>
            <button className="flex items-center gap-1">
              <MessageCircle size={18} /> Comment
            </button>
            <button className="flex items-center gap-1">
              <Send size={18} /> Share
            </button>
          </div>
        </div>

        {/* Write a comment */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-start gap-3">
            <img
              src="/default-profile.png"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 bg-gray-100 rounded-2xl p-3">
              <textarea
                placeholder="Write a comment..."
                className="w-full bg-transparent outline-none resize-none"
                rows={2}
              />
              <div className="flex items-center justify-between mt-2 text-gray-600">
                <div className="flex gap-3">
                  <Smile size={20} />
                  <Image size={20} />
                </div>
                <button className="bg-blue-600 text-white py-1 px-4 rounded-xl shadow-sm text-sm">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {/* Single Comment */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start gap-3">
              <img
                src="/default-profile.png"
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 bg-gray-100 rounded-2xl p-3">
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-gray-800 text-sm mt-1">
                  This comment section looks exactly like Facebook!
                </p>
                <div className="flex gap-4 mt-2 text-xs text-gray-600">
                  <button>Like</button>
                  <button>Reply</button>
                  <span>1h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Another Comment */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start gap-3">
              <img
                src="/default-profile.png"
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 bg-gray-100 rounded-2xl p-3">
                <p className="font-semibold text-sm">Alice Sharma</p>
                <p className="text-gray-800 text-sm mt-1">
                  Clean UI! Perfect for comment threads.
                </p>
                <div className="flex gap-4 mt-2 text-xs text-gray-600">
                  <button>Like</button>
                  <button>Reply</button>
                  <span>30m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
