import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ThumbsUp, MessageCircle, CornerUpRight } from "lucide-react";
import ReactionPopup from "./ReactionPopup";
import ShareModal from "./ShareModal";
import CommentModal from "./CommentModal"; // New modal for comments
import { REACTIONS, getReactionObj } from "../reactions.js";

export default function PostCard({ post, updatePost }) {
  const [reactingPost, setReactingPost] = useState(false);
  const [sharePost, setSharePost] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const reactionTimeout = useRef(null);

  const toggleLikeClick = () => {
    const reaction = post.userReaction ? null : "like";
    updatePost(post._id, reaction);
  };

  return (
    <div className="bg-white shadow-md rounded-xl text-black p-4 mb-4">
      {/* Shared post header */}
      {post.sharedFrom && (
        <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
          <span className="font-medium">{post.user.name}</span> shared{" "}
          <span className="font-medium">
            {post.sharedFrom.user?.name ?? "a post"}
          </span>
        </div>
      )}

      {/* User info */}
      <div className="flex items-center gap-3 mb-3">
        <Link to="/profile">
          <img
            src={post.user.profilePicture || "/default-user.png"}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
        </Link>
        <div>
          <h4 className="font-semibold hover:cursor-pointer hover:underline">
            {post.user.name}
          </h4>
        </div>
      </div>

      {/* Post content */}
      <p className="text-gray-800 mb-3 whitespace-pre-line leading-relaxed">
        {post.content || post.sharedFrom?.content}
      </p>
      {post.images && (
        <img
          src={post.images || post.sharedFrom?.images}
          alt=""
          className="w-full rounded-xl object-cover"
        />
      )}

      {/* Reaction summary placeholder */}
      <div className="py-1 flex items-center gap-2 text-sm min-h-[28px] ml-[4px]">
        {/* You can render reactions summary here */}
      </div>

      {/* Buttons */}
      <div className="h-10 w-full mt-4 justify-between flex relative">
        {/* LIKE BUTTON */}
        <div className="relative flex-1 flex justify-center">
          <button
            onClick={toggleLikeClick}
            onMouseEnter={() => setReactingPost(true)}
            onMouseLeave={() =>
              (reactionTimeout.current = setTimeout(
                () => setReactingPost(false),
                250
              ))
            }
            className="relative hover:cursor-pointer w-full justify-center font-semibold text-md items-center flex hover:bg-gray-100 p-2 rounded-md transition-colors"
          >
            {post.userReaction ? (
              getReactionObj(post.userReaction).emoji
            ) : (
              <ThumbsUp size={20} />
            )}
            <span className="pl-1">
              {post.userReaction
                ? getReactionObj(post.userReaction).label
                : "Like"}
            </span>
          </button>
          {reactingPost && (
            <ReactionPopup
              postId={post._id}
              setReactingPost={setReactingPost}
              updatePost={updatePost}
            />
          )}
        </div>

        {/* COMMENT BUTTON */}
        <button
          onClick={() => setCommentModalOpen(true)}
          className="flex-1 justify-center font-semibold hover:cursor-pointer text-md text-gray-600 items-center flex hover:bg-gray-100 p-2 rounded-md transition-colors"
        >
          <MessageCircle size={20} />
          <span className="pl-1">Comment</span>
        </button>

        {/* SHARE BUTTON */}
        <button
          onClick={() => setSharePost(true)}
          className="flex-1 hover:cursor-pointer justify-center font-semibold text-md text-gray-600 items-center flex hover:bg-gray-100 p-2 rounded-md transition-colors"
        >
          <CornerUpRight size={20} />
          <span className="pl-1">Share</span>
        </button>
      </div>

      {/* MODALS */}
      {commentModalOpen && (
        <CommentModal post={post} close={() => setCommentModalOpen(false)} />
      )}
      {sharePost && (
        <ShareModal post={post} close={() => setSharePost(false)} />
      )}
    </div>
  );
}
