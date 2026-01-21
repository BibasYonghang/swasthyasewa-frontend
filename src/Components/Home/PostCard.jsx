import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ThumbsUp,
  MessageCircle,
  CornerUpRight,
  MapPin,
  Clock,
} from "lucide-react";

import ReactionPopup from "./ReactionPopup";
import ShareModal from "./ShareModal";
import CommentModal from "./CommentModal";
import { getReactionObj } from "../reactions";
import UserAvatar from "../Shared/UserAvatar";

export default function PostCard({ post, updatePost }) {
  const [reactingPost, setReactingPost] = useState(false);
  const [sharePost, setSharePost] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);

  const reactionContainerRef = useRef(null);

  const handleReaction = (reactionType) => {
    const newReaction =
      reactionType === post.userReaction ? null : reactionType;
    updatePost(post._id, newReaction);
    setReactingPost(false);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    post?.userReaction
      ? handleReaction(post.userReaction)
      : setReactingPost(true);
  };

  // Close popup if clicked outside
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
    if (post?.images?.length) return post.images.filter(Boolean);
    if (post?.sharedFrom?.images?.length)
      return post.sharedFrom.images.filter(Boolean);
    return [];
  };

  const images = getPostImages();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4">
      {/* User Info */}
      <div className="flex items-start gap-3 mb-3">
        <Link to={`/profile/${post?.user?._id}`}>
          <UserAvatar user={post.user} size={12} fallbackToRedux={false} />
        </Link>
        <div className="flex-1">
          <Link
            to={`/profile/${post?.user?._id}`}
            className="font-semibold hover:underline"
          >
            {post?.user?.name || "Unknown"}
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

      {/* Content */}
      <p className="mb-4 text-gray-800 whitespace-pre-line">
        {post?.content || post?.sharedFrom?.content}
      </p>
      {images.length > 0 && (
        <div
          className={`mb-4 grid gap-1 rounded-xl overflow-hidden ${
            images.length === 1 ? "" : "grid-cols-2"
          }`}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Post ${index}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex justify-between text-sm text-gray-500 py-2">
        {post?.reactions?.length > 0 && (
          <span>{post.reactions.length} reactions</span>
        )}
        {post?.comments?.length > 0 && (
          <span>{post.comments.length} comments</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex mt-2 h-10">
        <div
          ref={reactionContainerRef}
          className="flex-1 relative justify-center items-center gap-1 hover:bg-gray-100 rounded-md"
        >
          <button
            onClick={handleLikeClick}
            className="w-full h-full hover:cursor-pointer flex justify-center items-center gap-1 hover:bg-gray-100 rounded-md"
          >
            {post?.userReaction ? (
              getReactionObj(post.userReaction)?.emoji
            ) : (
              <ThumbsUp size={20} />
            )}
            <span>
              {post?.userReaction
                ? getReactionObj(post.userReaction)?.label
                : "Like"}
            </span>
          </button>
          {reactingPost && <ReactionPopup handleReaction={handleReaction} />}
        </div>

        <button
          onClick={() => setCommentModalOpen(true)}
          className="flex-1 flex hover:cursor-pointer justify-center items-center gap-1 hover:bg-gray-100 rounded-md"
        >
          <MessageCircle size={20} />
          Comment
        </button>

        <button
          onClick={() => setSharePost(true)}
          className="flex-1 flex hover:cursor-pointer justify-center items-center gap-1 hover:bg-gray-100 rounded-md"
        >
          <CornerUpRight size={20} />
          Share
        </button>
      </div>

      {commentModalOpen && (
        <CommentModal post={post} close={() => setCommentModalOpen(false)} />
      )}
      {sharePost && (
        <ShareModal post={post} close={() => setSharePost(false)} />
      )}
    </div>
  );
}
