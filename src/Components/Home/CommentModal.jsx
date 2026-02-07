import React, { useState } from "react";
import { Smile, Image, Send, Clock, MapPin, User } from "lucide-react";
import { REACTIONS } from "../reactions.js";
import UserAvatar from "../Shared/UserAvatar.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  const loggedInUser = useSelector((state) => state.auth.user);

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <Link to={`/profile/${loggedInUser._id}`}>
        <UserAvatar user={loggedInUser} size={12} fallbackToRedux={false} />
      </Link>{" "}
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
      <Link to={`/profile/${comment?.user?._id}`} className="mt-2">
        <UserAvatar user={comment.user} size={12} fallbackToRedux={false} />
      </Link>

      <div className="flex flex-col py-2">
        <div className="bg-gray-100 px-3 py-2 rounded-2xl ">
          <Link to={`/profile/${comment?.user?._id}`} className="text-sm">
            {comment.user.name}
          </Link>
          <p className=" text-sm text-gray-900">{comment.content}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1 ml-1">
          <button className="hover:underline hover:cursor-pointer hover:text-blue-600 transition-all">
            Like
          </button>
          <button className="hover:underline hover:cursor-pointer hover:text-blue-600 transition-all">
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
  const loggedInUser = useSelector((state) => state.auth.user);

  const handleNewComment = (text) => {
    const newComment = {
      id: Date.now(),
      user: loggedInUser,
      content: text,
      createdAt: "Just now",
    };
    setComments([...comments, newComment]);
  };

  const totalReactions = post?.reactions
    ? Object.values(post.reactions).reduce((a, b) => a + b, 0)
    : 0;

  const formatTime = (timestamp) => {
    timestamp
      ? new Date(timestamp).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : "";
  };

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
          <div className="flex gap-4 py-4">
            <Link to={`/profile/${post?.user?._id}`}>
              <UserAvatar user={post.user} size={12} fallbackToRedux={false} />
            </Link>
            <div>
              <Link to={`/profile/${post?.user?._id}`} className="">
                {post.user.name}
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                {post?.location && (
                  <>
                    <MapPin size={14} />
                    <span>{post.location}</span>
                    <span>•</span>
                  </>
                )}
                <Clock size={14} />
                <span>{formatTime(post?.createdAt)}</span>
              </div>
            </div>
          </div>

          {post.content && <p className="text-gray-900 mb-2">{post.content}</p>}
          {post.images && post.images.length > 0 && post.images[0] && (
            <img
              src={post.images[0]}
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
        <CommentBox onComment={handleNewComment} />
      </div>
    </div>
  );
}
