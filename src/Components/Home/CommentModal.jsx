import React, { useState } from "react";
import { Smile, Image, Send } from "lucide-react";
import { REACTIONS } from "../reactions.js";

function ReactionIcons({ reactions }) {
  const topReactions = Object.entries(reactions || {})
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => REACTIONS.find((r) => r.id === key)?.emoji);

  return (
    <div className="flex -space-x-2">
      {topReactions.map((emoji) => (
        <span
          key={emoji}
          className="z-30 border-2 border-white rounded-full bg-white text-sm w-6 h-6 flex items-center justify-center"
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

function CommentBox({ onComment }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onComment(value);
      setValue("");
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <img
        src="/default-user.png"
        alt="Your profile"
        className="w-9 h-9 rounded-full object-cover"
      />
      <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-2 border border-gray-200">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
        />
        <div className="flex items-center gap-2 ml-2 text-gray-500">
          <Smile className="hover:text-blue-600 cursor-pointer" size={18} />
          <Image className="hover:text-blue-600 cursor-pointer" size={18} />
          <button
            type="button"
            onClick={handleSend}
            className="hover:text-blue-600 cursor-pointer"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentItem({ comment }) {
  return (
    <div className="flex items-start gap-2 px-4">
      <img
        src={comment.user.profilePicture}
        alt={comment.user.name}
        className="w-9 h-9 rounded-full object-cover mt-1"
      />
      <div className="flex flex-col">
        <div className="bg-gray-100 px-3 py-2 rounded-2xl max-w-[80%]">
          <span className="font-semibold text-sm">{comment.user.name}</span>
          <span className="ml-1 text-sm text-gray-900">{comment.content}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1 ml-1">
          <button className="hover:underline hover:text-blue-600 transition-all">
            Like
          </button>
          <button className="hover:underline hover:text-blue-600 transition-all">
            Reply
          </button>
          <span>{comment.createdAt}</span>
        </div>
      </div>
    </div>
  );
}

export default function CommentModal({ post, close }) {
  const [comments, setComments] = useState(post.comments || []);

  const handleNewComment = (text) => {
    const newComment = {
      id: Date.now(),
      user: { name: "You", profilePicture: "/default-user.png" },
      content: text,
      createdAt: "Just now",
    };
    setComments([...comments, newComment]);
  };

  const totalReactions = post?.reactions
    ? Object.values(post.reactions).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-400 opacity-70 backdrop-blur-sm"></div>

      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Post</h3>
          <button
            onClick={close}
            className="text-gray-600 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2"
          >
            ✖
          </button>
        </div>

        {/* Post content */}
        <div className="px-4 py-3">
          {post.content && <p className="text-gray-900 mb-2">{post.content}</p>}
          {post.images && (
            <img
              src={post.images}
              alt="Post"
              className="rounded-lg max-h-96 w-full object-cover"
            />
          )}
        </div>

        <div className="border-t border-gray-200" />

        {/* Reactions summary */}
        <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <ReactionIcons reactions={post.reactions || {}} />
            {totalReactions > 0 && <span>{totalReactions}</span>}
          </div>
        </div>

        <div className="border-t border-gray-200" />

        {/* Comments list */}
        <div className="mt-2 space-y-2">
          {comments.map((comment) => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </div>

        <div className="border-t border-gray-200" />

        {/* Comment input */}
        <CommentBox onComment={handleNewComment} />
      </div>
    </div>
  );
}
