import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ThumbsUp,
  MessageCircle,
  CornerUpRight,
  MapPin,
  Clock,
  MoreVertical,
  EyeOff,
  Flag,
} from "lucide-react";

import ReactionPopup from "./ReactionPopup";
import ShareModal from "./ShareModal";
import CommentModal from "./CommentModal";
import { getReactionObj } from "../../utils/reactionUtils";
import UserAvatar from "../Shared/UserAvatar";

function useOutsideClick(ref, isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isOpen, onClose, ref]);
}
export default function PostCard({ post, updatePost }) {
  const [reactingPost, setReactingPost] = useState(false);
  const [sharePost, setSharePost] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [options, setOptions] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reported, setReported] = useState(false);

  const reactionRef = useRef(null);
  const optionsRef = useRef(null);

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

  const handleHidePost = () => {
    setHidden(true); // instant UX
    setOptions(false);

    //  backend call placeholder
    console.log("Post hidden:", post._id);
    // await api.hidePost(post._id)
  };

  const handleReportPost = () => {
    if (reported) return;

    setReported(true);
    setOptions(false);

    //  backend call placeholder
    console.log("Post reported:", post._id);
    // await api.reportPost(post._id)
  };

  useOutsideClick(reactionRef, reactingPost, () => setReactingPost(false));

  useOutsideClick(optionsRef, options, () => setOptions(false));

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
  if (hidden) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4">
      <div className="flex relative items-start gap-3 mb-3">
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

        {/* options */}
        <div ref={optionsRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOptions((p) => !p);
            }}
            className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-full"
          >
            <MoreVertical size={20} className="opacity-60" />
          </button>

          {options && (
            <div className="h-40 overflow-y-auto p-3 absolute z-50 right-0 top-10 rounded-lg w-70 bg-white shadow-[0_0_9px_rgba(0,0,0,0.25)]">
              <div
                onClick={handleHidePost}
                className="cursor-pointer flex items-center hover:bg-gray-100 p-2 rounded-md"
              >
                <EyeOff size={20} className="text-yellow-700 mr-2" />
                <h1 className="font-semibold">
                  Hide Post
                  <p className="text-xs text-gray-700">
                    See Fewer Post Like This
                  </p>
                </h1>
              </div>

              <div
                onClick={handleReportPost}
                className="cursor-pointer flex items-center hover:bg-gray-100 p-2 rounded-md"
              >
                <Flag size={20} className="mr-2 text-red-600" />
                <h1 className="font-semibold">
                  {reported ? "Reported" : "Report Post"}
                  <p className="text-xs text-gray-700">
                    We won't let anyone Knows Who Reported this
                  </p>
                </h1>
              </div>
            </div>
          )}
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
          ref={reactionRef}
          className="flex-1 relative hover:bg-gray-100 rounded-md"
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
