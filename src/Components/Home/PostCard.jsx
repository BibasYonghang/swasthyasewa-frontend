import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ThumbsUp,
  MessageCircle,
  CornerUpRight,
  MapPin,
  Clock,
  User,
} from "lucide-react";

import ReactionPopup from "./ReactionPopup";
import ShareModal from "./ShareModal";
import CommentModal from "./CommentModal";
import { getReactionObj } from "../reactions";

export default function PostCard({ post, updatePost }) {
  const [reactingPost, setReactingPost] = useState(false);
  const [sharePost, setSharePost] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const reactionContainerRef = useRef(null);

  // ---------------------- Reaction handling ----------------------
  const handleReaction = (reactionType) => {
    const newReaction =
      reactionType === post.userReaction ? null : reactionType;

    updatePost(post._id, newReaction);
    setReactingPost(false);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();

    if (post?.userReaction) {
      handleReaction(post.userReaction);
    } else {
      setReactingPost(true);
    }
  };

  // ---------------------- Close popup on outside click ----------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        reactingPost &&
        reactionContainerRef.current &&
        !reactionContainerRef.current.contains(event.target)
      ) {
        setReactingPost(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [reactingPost]);

  // ---------------------- Helpers ----------------------
  const formatTime = (timestamp) =>
    timestamp
      ? new Date(timestamp).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : "";

  const getPostImages = () => {
    if (post?.images?.length > 0) return post.images.filter(Boolean);
    if (post?.sharedFrom?.images?.length > 0)
      return post.sharedFrom.images.filter(Boolean);

    return [];
  };

  // Check if user has a valid profile picture
  const hasProfilePicture = () => {
    return (
      post?.user?.profilePicture &&
      post.user.profilePicture.trim() !== "" &&
      post.user.profilePicture !== "null" &&
      !post.user.profilePicture.includes("default-user.png")
    );
  };

  // Generate Facebook-style default avatar with user's initial
  const getDefaultAvatar = () => {
    const userName = post?.user?.name || "User";
    const initial = userName.charAt(0).toUpperCase();

    // Facebook-like color palette
    const colors = [
      "bg-blue-500",
      "bg-red-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];

    // Consistent color based on user ID or name
    const colorIndex = post?.user?._id
      ? post.user._id.charCodeAt(0) % colors.length
      : userName.charCodeAt(0) % colors.length;

    return (
      <div
        className={`w-12 h-12 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-semibold text-lg border-2 border-white shadow-sm`}
      >
        {initial}
      </div>
    );
  };

  const images = getPostImages();
  const hasMultipleImages = images.length > 1;

  // ---------------------- Render ----------------------
  return (
    <div className="bg-white shadow-md rounded-xl text-black p-4 mb-4 border border-gray-200">
      {/* -------------------- User Info -------------------- */}
      <div className="flex items-start gap-3 mb-3">
        <Link to={`/profile/${post?.user?._id}`} className="flex-shrink-0">
          {hasProfilePicture() ? (
            <img
              src={post.user.profilePicture}
              alt={post?.user?.name || "User"}
              className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-user.png";
              }}
            />
          ) : (
            getDefaultAvatar()
          )}
        </Link>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link
              to={`/profile/${post?.user?._id}`}
              className="font-semibold text-gray-900 hover:underline"
            >
              {post?.user?.name || "Unknown"}
            </Link>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1 flex-wrap">
            {post?.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{post.location}</span>
              </div>
            )}

            {post?.location && <span>•</span>}

            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{formatTime(post?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- Post Content -------------------- */}
      <div className="mb-4">
        <p className="text-gray-800 whitespace-pre-line leading-relaxed text-[15px]">
          {post?.content || post?.sharedFrom?.content}
        </p>
      </div>

      {/* -------------------- Images -------------------- */}
      {images.length > 0 && (
        <div
          className={`mb-4 rounded-xl overflow-hidden border border-gray-200 ${
            hasMultipleImages ? "grid gap-1" : ""
          } ${
            images.length === 2
              ? "grid-cols-2"
              : images.length >= 3
              ? "grid-cols-2 grid-rows-2"
              : ""
          }`}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative cursor-pointer transition-transform hover:opacity-95 ${
                images.length === 3 && index === 0 ? "row-span-2" : ""
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className={`w-full h-full object-cover ${
                  hasMultipleImages ? "aspect-square" : "max-h-96"
                }`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* -------------------- Stats -------------------- */}
      <div className="py-2 flex items-center justify-between text-sm text-gray-500 border-b border-gray-100">
        <div className="flex items-center gap-1">
          {post?.reactions?.length > 0 && (
            <span>{post.reactions.length} reactions</span>
          )}
        </div>

        {post?.comments?.length > 0 && (
          <span>{post.comments.length} comments</span>
        )}
      </div>

      {/* -------------------- Action Buttons -------------------- */}
      <div className="h-10 w-full mt-2 flex justify-between relative">
        {/* Like Button */}
        <div
          ref={reactionContainerRef}
          className="relative flex-1 flex justify-center"
        >
          <button
            onClick={handleLikeClick}
            className={`w-full flex items-center justify-center font-semibold text-md p-2 rounded-md hover:bg-gray-100 transition-colors ${
              post?.userReaction
                ? `text-${getReactionObj(post.userReaction)?.color}-600`
                : "text-gray-600"
            }`}
          >
            {post?.userReaction ? (
              <span className="text-lg">
                {getReactionObj(post.userReaction)?.emoji}
              </span>
            ) : (
              <ThumbsUp size={20} />
            )}

            <span className="pl-1">
              {post?.userReaction
                ? getReactionObj(post.userReaction)?.label
                : "Like"}
            </span>
          </button>

          {reactingPost && <ReactionPopup handleReaction={handleReaction} />}
        </div>

        {/* Comment Button */}
        <button
          onClick={() => setCommentModalOpen(true)}
          className="flex-1 flex items-center justify-center font-semibold text-md text-gray-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <MessageCircle size={20} />
          <span className="pl-1">Comment</span>
        </button>

        {/* Share Button */}
        <button
          onClick={() => setSharePost(true)}
          className="flex-1 flex items-center justify-center font-semibold text-md text-gray-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <CornerUpRight size={20} />
          <span className="pl-1">Share</span>
        </button>
      </div>

      {/* -------------------- Modals -------------------- */}
      {commentModalOpen && (
        <CommentModal post={post} close={() => setCommentModalOpen(false)} />
      )}

      {sharePost && (
        <ShareModal post={post} close={() => setSharePost(false)} />
      )}
    </div>
  );
}
