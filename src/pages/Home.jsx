// src/pages/Home.jsx
import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import HomeTop from "../Components/Home/HomeTop.jsx";
import {
  CornerUpRight,
  Cross,
  CrossIcon,
  MessageCircle,
  Send,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";

// Facebook style reactions
const REACTIONS = [
  { id: "like", emoji: "👍", label: "Like", color: "text-blue-600" },
  { id: "love", emoji: "❤️", label: "Love", color: "text-red-500" },
  { id: "haha", emoji: "😆", label: "Haha", color: "text-yellow-400" },
  { id: "wow", emoji: "😮", label: "Wow", color: "text-yellow-400" },
  { id: "sad", emoji: "😢", label: "Sad", color: "text-yellow-600" },
  { id: "angry", emoji: "😡", label: "Angry", color: "text-red-700" },
];

function getReactionObj(reactionId) {
  return REACTIONS.find((r) => r.id === reactionId);
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Comments popup state
  const [openComments, setOpenComments] = useState(null);

  // For emoji reaction popup
  const [reactingPost, setReactingPost] = useState(null);
  const reactionTimeout = useRef(null);

  // For share modal and composer state
  const [sharePost, setSharePost] = useState(null);
  const [shareComment, setShareComment] = useState(""); // what user enters to say about the shared post
  const [isSharing, setIsSharing] = useState(false);
  const [messengerUser, setMessengerUser] = useState(""); // for Messenger username
  const [isMessengerSharing, setIsMessengerSharing] = useState(false);

  // Fetch posts just like FB feed
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/api/posts?page=${page}&limit=5`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const newPosts = Array.isArray(res.data.posts) ? res.data.posts : [];
      setPosts((prev) => [...prev, ...newPosts]);
      setHasMore(res.data.hasMore ?? newPosts.length > 0);
      setPage((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(
        "Error fetching posts:",
        error.response?.data || error.message
      );
    }
  };

  React.useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  // Facebook-style: stop scroll on modal open
  React.useEffect(() => {
    document.body.style.overflow =
      openComments || sharePost ? "hidden" : "auto";
  }, [openComments, sharePost]);

  // Send a reaction (same API for Like or emoji)
  const sendReaction = async (postId, reactionId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:3000/api/posts/${postId}/react`,
        { reaction: reactionId },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                reactions: res.data.reactions,
                userReaction: res.data.userReaction,
              }
            : p
        )
      );
    } catch (error) {
      console.error("Reaction error:", error);
    }
  };

  // Toggle off reaction if already set, otherwise set to like (FB behavior)
  const toggleLikeClick = (post) => {
    // If user has already reacted (any kind) remove reaction, else set to "like"
    sendReaction(post._id, post.userReaction ? null : "like");
  };

  // FB-style reaction popup handlers (on hover)
  const handleReactionButtonMouseEnter = (postId) => {
    clearTimeout(reactionTimeout.current);
    setReactingPost(postId);
  };
  const handleReactionButtonMouseLeave = () => {
    reactionTimeout.current = setTimeout(() => setReactingPost(null), 250);
  };
  const handleReactionPopupMouseEnter = () => {
    clearTimeout(reactionTimeout.current);
  };
  const handleReactionPopupMouseLeave = () => {
    setReactingPost(null);
  };

  // Utility: count all reactions from reactions object
  const totalReactionsCount = (reactions) =>
    reactions ? Object.values(reactions).reduce((sum, v) => sum + v, 0) : 0;

  // Utility: render all reaction emojis with counts for each post (like Facebook)
  function renderReactionSummary(reactions) {
    if (!reactions) return null;
    // Show only those with at least 1 count, prioritizing Like, Love, etc.
    const shown = REACTIONS.filter((r) => reactions[r.id]);
    if (shown.length === 0) return null;
    return (
      <div className="flex items-center gap-1">
        <span className="flex -space-x-2">
          {shown.map((r) => (
            <span
              key={r.id}
              className={`text-lg z-10 border border-white rounded-full p-[2px] bg-white`}
              style={{ marginLeft: "-8px" }}
            >
              {r.emoji}
            </span>
          ))}
        </span>
        <span className="ml-2 text-gray-600 text-sm">
          {totalReactionsCount(reactions)}
        </span>
      </div>
    );
  }

  // Actually perform the attach/share functionality
  const handleShareToTimeline = async (postId) => {
    setIsSharing(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/api/posts/${postId}/share`,
        {
          comment: shareComment, // user's message with the share
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setSharePost(null);
      setShareComment("");
      setIsSharing(false);
      setMessengerUser("");
      // Optionally, refetch or refresh timeline or insert the new shared post at the top
      fetchPosts();
      alert("Shared to your timeline!");
    } catch (error) {
      setIsSharing(false);
      alert("Failed to share. Please try again.");
      console.error("Share error:", error);
    }
  };

  // Actually share post in Messenger to a user
  const handleShareInMessenger = async (postId) => {
    if (!messengerUser.trim()) {
      alert("Please enter a Messenger username.");
      return;
    }
    setIsMessengerSharing(true);
    try {
      const token = localStorage.getItem("token");
      // Example endpoint: /api/posts/:id/share-messenger
      await axios.post(
        `http://localhost:3000/api/posts/${postId}/share-messenger`,
        {
          toUser: messengerUser.trim(),
          comment: shareComment,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setMessengerUser("");
      setShareComment("");
      setSharePost(null);
      setIsMessengerSharing(false);
      alert(`Post shared with ${messengerUser} on Messenger!`);
    } catch (error) {
      setIsMessengerSharing(false);
      alert(
        error.response?.data?.message ||
          "Failed to share in Messenger. Try again."
      );
      console.error("Messenger share error:", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen mt-16 relative">
      <div className="w-full max-w-lg">
        <HomeTop />
        {(openComments || sharePost) && (
          <div className="fixed inset-0 bg-white overflow-y-auto opacity-80 backdrop-blur-sm z-10"></div>
        )}

        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={loading && <h4 className="text-center mt-4">Loading...</h4>}
          endMessage={
            <p className="text-center text-gray-500 mt-4">No more posts</p>
          }
        >
          {posts.map((post) => {
            const {
              user,
              content,
              images,
              reactions = {},
              userReaction,
              _id,
              sharedFrom, // for rendering shared posts
              shareComment: postShareComment,
              sharedAt,
            } = post;
            const isFocused = openComments === _id;
            const activeReactionObj = getReactionObj(userReaction);

            // If the post is a shared post, show the "shared" info and content of the original post
            const original = sharedFrom || null;
            const displayContent = original ? original.content : content;
            const displayImages = original ? original.images : images;
            const displayUser = original ? original.user : user;
            const displayShareComment = postShareComment;

            return (
              <div
                key={_id}
                className={`bg-white shadow-md rounded-xl text-black p-4 mb-4 transition-all duration-200
                  ${
                    isFocused
                      ? "fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg z-20"
                      : ""
                  }
                `}
                style={{ boxSizing: "border-box" }}
              >
                {original && (
                  <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <span className="font-medium">{user.name}</span> shared{" "}
                    <span className="font-medium">
                      {displayUser?.name ?? "a post"}
                    </span>
                  </div>
                )}

                {/* If this shared post has a user's share comment, render it */}
                {original && displayShareComment && (
                  <div className="text-gray-800 mb-2 whitespace-pre-line leading-relaxed italic">
                    {displayShareComment}
                  </div>
                )}

                {/* Close button for comments */}
                {isFocused && (
                  <button
                    onClick={() => setOpenComments(null)}
                    className="absolute top-3 right-3 hover:cursor-pointer bg-gray-200 p-2 rounded-full shadow"
                  >
                    ✖
                  </button>
                )}

                {/* User Info (original poster if shared, otherwise post author) */}
                <div className="flex items-center gap-3 mb-3">
                  <Link to="/profile">
                    <img
                      src="/default-user.png"
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>
                  <div>
                    <h4 className="font-semibold hover:cursor-pointer hover:underline">
                      {displayUser?.name ?? user.name}
                    </h4>
                  </div>
                </div>

                {/* Content */}
                {displayContent && (
                  <p className="text-gray-800 mb-3 whitespace-pre-line leading-relaxed">
                    {displayContent}
                  </p>
                )}
                {displayImages && (
                  <img
                    src={displayImages}
                    alt=""
                    className="w-full rounded-xl object-cover"
                  />
                )}

                {/* Reactions summary bar (emojis + counts) */}
                <div className="py-1 flex items-center gap-2 text-sm min-h-[28px] ml-[4px]">
                  {renderReactionSummary(reactions)}
                </div>

                {/* Like / Comment / Share row */}
                <div className="h-10 w-full mt-4 justify-between flex relative">
                  {/* LIKE/REACTION BUTTON */}
                  <div className="relative flex-1 flex justify-center">
                    <button
                      onClick={() => toggleLikeClick(post)}
                      onMouseEnter={() => handleReactionButtonMouseEnter(_id)}
                      onMouseLeave={handleReactionButtonMouseLeave}
                      className={`relative hover:cursor-pointer w-full justify-center font-semibold text-md items-center flex hover:bg-gray-100 p-2 rounded-md transition-colors
                        ${
                          activeReactionObj
                            ? activeReactionObj.color
                            : "text-gray-600"
                        }
                      `}
                      aria-label="Like"
                    >
                      {activeReactionObj ? (
                        <span className="text-xl">
                          {activeReactionObj.emoji}
                        </span>
                      ) : (
                        <ThumbsUp size={20} className="mr-1" />
                      )}
                      <span className="pl-1">
                        {activeReactionObj ? activeReactionObj.label : "Like"}
                      </span>
                    </button>

                    {/* Reaction popup (Facebook style floating panel w/ emojis) */}
                    {reactingPost === _id && (
                      <div
                        className="absolute z-50 -top-12 left-1/2 -translate-x-1/2 bg-white border shadow-xl px-2 py-1 rounded-full flex gap-2 items-center transition-all"
                        onMouseEnter={handleReactionPopupMouseEnter}
                        onMouseLeave={handleReactionPopupMouseLeave}
                        style={{ minWidth: "max-content" }}
                      >
                        {REACTIONS.map((react) => (
                          <span
                            key={react.id}
                            onClick={() => {
                              sendReaction(_id, react.id);
                              setReactingPost(null);
                            }}
                            className="text-2xl mx-0.5 hover:scale-125 cursor-pointer transition-transform select-none"
                            title={react.label}
                          >
                            {react.emoji}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* COMMENT BUTTON */}
                  <button
                    onClick={() => setOpenComments(_id)}
                    className="flex-1 justify-center font-semibold hover:cursor-pointer overflow-y-auto text-md text-gray-600 items-center flex hover:bg-gray-100 p-2 rounded-md transition-colors"
                  >
                    <MessageCircle size={20} />
                    <span className="pl-1">Comment</span>
                  </button>

                  {/* SHARE BUTTON (Facebook style - actually can share to timeline as FB) */}
                  <button
                    onClick={() => {
                      setSharePost(_id);
                      setShareComment("");
                      setMessengerUser("");
                    }}
                    className="flex-1 hover:cursor-pointer justify-center font-semibold text-md text-gray-600 items-center flex hover:bg-gray-100 p-2 rounded-md transition-colors"
                  >
                    <CornerUpRight size={20} />
                    <span className="pl-1">Share</span>
                  </button>
                </div>

                {/* SHARE POP COMPONENTS */}
                {sharePost === _id && (
                  <div className="fixed z-40 top-24 left-1/2 -translate-x-1/2 max-h-[80vh] overflow-y-auto bg-white shadow-xl rounded-xl max-w-xl p-4">
                    <div className="flex justify-between py-3">
                      <h3 className="font-semibold text-lg mb-3">Share post</h3>
                      <button
                        onClick={() => setSharePost(null)}
                        className="hover:cursor-pointer hover:bg-gray-300 rounded-full p-2 transform duration-150"
                      >
                        ✖
                      </button>
                    </div>

                    {/* Facebook style share composer */}
                    <textarea
                      className="w-full border border-gray-200 rounded-lg p-2 mb-3 focus:outline-none focus:ring"
                      rows={3}
                      placeholder="Say something about this post..."
                      value={shareComment}
                      onChange={(e) => setShareComment(e.target.value)}
                      disabled={isSharing || isMessengerSharing}
                    />

                    {/* Visual of what will be shared */}
                    <div className="border border-gray-100 bg-gray-50 rounded-md p-3 mb-3 text-sm">
                      <div className="flex gap-2 items-center mb-2">
                        <img
                          src={
                            (post.user && post.user.profilePicture) ||
                            "/default-user.png"
                          }
                          alt="post-user"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-semibold">
                          {(post.user && post.user.name) || "User"}
                        </span>
                        {post.sharedFrom && (
                          <span className="text-xs text-gray-500 ml-2">
                            originally posted by {post.sharedFrom.user?.name}
                          </span>
                        )}
                      </div>
                      <div className="mb-1">
                        {post.content || (post.sharedFrom?.content ?? "")}
                      </div>
                      {(post.images || post.sharedFrom?.images) && (
                        <img
                          src={post.images || post.sharedFrom?.images}
                          alt="post-img"
                          className="rounded w-full mt-2"
                        />
                      )}
                    </div>

                    <button
                      className={`w-full text-left p-3 mb-2 hover:cursor-pointer rounded-md font-semibold flex items-center justify-center ${
                        isSharing
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      disabled={isSharing || isMessengerSharing}
                      onClick={() => handleShareToTimeline(_id)}
                    >
                      {isSharing ? "Sharing..." : "Share to your timeline"}
                    </button>

                    <button
                      className="w-full text-center font-semibold p-3 mb-2 bg-blue-600  hover:bg-blue-700 hover:cursor-pointer text-white rounded-md"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/post/${_id}`
                        );
                        alert("Link copied to clipboard!");
                        setSharePost(null);
                      }}
                    >
                      Copy link
                    </button>
                    <button
                      onClick={() => setSharePost(null)}
                      className="mt-3 w-full hover:cursor-pointer hover:bg-gray-400 bg-gray-300 duration-100 transform text-center p-2 rounded-md"
                    >
                      Close
                    </button>
                  </div>
                )}

                {/* Comments-like popup (simplified, not full FB) */}
                {isFocused && (
                  <div className="mt-4 w-max-xl max-h-[80vh] overflow-y-auto p-3 bg-gray-50  rounded-md shadow-inner">
                    {/* Sample comments, replace with mapped real data if available */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-700">
                        <strong>Bibas:</strong> This is amazing!
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <img
                        src="/default-user.png"
                        className="w-8 h-8 rounded-full"
                        alt="com"
                      />
                      <div className="w-full flex bg-gray-100 p-2 rounded-full">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          className="w-full bg-gray-100 outline-none p-2 rounded-full"
                        />
                        <button className="hover:cursor-pointer p-2 hover:bg-gray-300 rounded-full ">
                          <Send size={20} className="" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </InfiniteScroll>

        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No posts available yet.
          </p>
        )}
      </div>
    </div>
  );
}
