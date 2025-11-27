import React, { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Send,
  MoreHorizontal,
  Smile,
  Image,
} from "lucide-react";
import { REACTIONS } from "../Components/reactions";

// Sample data for demonstration (replace with API data in real case)
const post = {
  user: { name: "Bibas Yonghang", profilePicture: "/default-profile.png" },
  createdAt: "2 hours ago",
  content:
    "This is an example post, just like how Facebook displays a post before comments.",
  images: null,
  reactions: {
    like: 3,
    love: 2,
    haha: 0,
    wow: 1,
    sad: 0,
    angry: 0,
  },
  userReaction: "like",
  comments: [
    {
      id: 1,
      user: {
        name: "John Doe",
        profilePicture: "/default-profile.png",
      },
      content: "This comment section looks exactly like Facebook!",
      createdAt: "1h",
      reactions: {
        like: 1,
        love: 0,
        haha: 0,
      },
      userReaction: null,
    },
    {
      id: 2,
      user: {
        name: "Alice Sharma",
        profilePicture: "/default-profile.png",
      },
      content: "Clean UI! Perfect for comment threads.",
      createdAt: "30m",
      reactions: {
        like: 1,
        love: 1,
        wow: 0,
      },
      userReaction: "love",
    },
  ],
};

function ReactionIcons({ reactions }) {
  // Facebook groups reactions icons with overlap
  const topReactions = Object.entries(reactions)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => REACTIONS.find((r) => r.id === key)?.emoji);

  return (
    <div className="flex -space-x-2">
      {topReactions.map((emoji, idx) => (
        <span
          key={emoji}
          className={`z-${
            30 - idx
          } border-white border-2 rounded-full bg-white text-xl`}
          style={{ marginLeft: idx === 0 ? 0 : "-8px" }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

function CommentBox() {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center py-2 px-4">
      <img
        src="/default-profile.png"
        alt="Your profile"
        className="w-9 h-9 rounded-full object-cover mr-2"
      />
      <div className="flex-1 rounded-3xl bg-gray-100 px-3 py-1.5 border border-gray-200 flex items-center">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-transparent outline-none placeholder:text-gray-500 text-sm"
          placeholder="Write a comment..."
        />
        <div className="flex items-center gap-2 ml-2 text-gray-500">
          <Smile className="hover:text-blue-600 cursor-pointer" size={20} />
          <Image className="hover:text-blue-600 cursor-pointer" size={20} />
          <Send className="hover:text-blue-600 cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  );
}

function CommentItem({ comment }) {
  return (
    <div className="flex items-start gap-2 pl-2">
      <img
        src={comment.user.profilePicture}
        alt={comment.user.name}
        className="w-9 h-9 rounded-full mt-1 object-cover"
      />
      <div>
        <div className="bg-gray-100 px-3 py-2 rounded-2xl max-w-lg">
          <span className="font-semibold text-sm">{comment.user.name}</span>
          <span className="ml-2 text-gray-900 text-sm">{comment.content}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 ml-2 mt-0.5">
          <button className="hover:underline font-semibold hover:text-blue-600 transition-all">
            Like
          </button>
          <button className="hover:underline font-semibold hover:text-blue-600 transition-all">
            Reply
          </button>
          <span>{comment.createdAt}</span>
        </div>
      </div>
    </div>
  );
}

export default function Comment() {
  const totalReactions = Object.values(post.reactions).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto mt-6">
        {/* Post Card */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex items-start gap-3">
            <img
              src={post.user.profilePicture}
              alt={post.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{post.user.name}</div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {post.createdAt} · <span title="Public">🌎</span>
                  </div>
                </div>
                <MoreHorizontal className="text-gray-600" />
              </div>
              <div className="mt-2 whitespace-pre-line text-gray-900 leading-relaxed text-[15px]">
                {post.content}
              </div>
              {post.images && (
                <img
                  src={post.images}
                  alt=""
                  className="rounded-xl w-full mt-3 border"
                />
              )}
            </div>
          </div>
          {/* Reaction summary */}
          <div className="flex items-center justify-between mt-3 px-1 text-sm">
            <div className="flex items-center gap-2">
              <ReactionIcons reactions={post.reactions} />
              {totalReactions > 0 && (
                <span className="text-gray-500 ml-2">{totalReactions}</span>
              )}
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <span className="hover:underline cursor-pointer">6 comments</span>
              <span className="hover:underline cursor-pointer">1 share</span>
            </div>
          </div>
          <div className="border-t mt-2 mb-2" />

          {/* Action Buttons */}
          <div className="flex items-center text-sm font-semibold text-gray-700 select-none divide-x divide-gray-200">
            <button
              className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg transition`}
            >
              <ThumbsUp size={19} className="mr-1" />
              Like
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg transition`}
            >
              <MessageCircle size={19} className="mr-1" />
              Comment
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg transition`}
            >
              <Send size={19} className="mr-1" />
              Share
            </button>
          </div>
        </div>

        {/* Write a comment */}
        <div className="pl-2">
          <CommentBox />
        </div>

        {/* Comments List */}
        <div className="mt-1 space-y-2">
          {post.comments.map((comment) => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
