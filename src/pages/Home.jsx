import React, { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { fetchPosts, sendReaction } from "../config/api/posts.js";
import HomeTop from "../Components/Home/HomeTop.jsx";
import PostCard from "../Components/Home/PostCard.jsx";
import StorySection from "../Components/Home/StorySection.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]); // older posts loaded via infinite scroll
  const [newPosts, setNewPosts] = useState([]); // newly uploaded posts
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loggedInUser = useSelector((state) => state.auth.user);

  // -----------------------------
  // Fetch older posts (infinite scroll)
  // -----------------------------
  const getPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await fetchPosts(page);

      // Filter out duplicates (avoid same _id in posts or newPosts)
      const newFetchedPosts = (data.posts || []).filter(
        (p) =>
          !posts.some((existing) => existing._id === p._id) &&
          !newPosts.some((existing) => existing._id === p._id),
      );

      setPosts((prevPosts) => [...prevPosts, ...newFetchedPosts]);
      setHasMore(data.hasMore);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading, posts, newPosts]);

  // -----------------------------
  // Update a post after reaction
  // -----------------------------
  const updatePost = async (postId, reaction) => {
    try {
      const res = await sendReaction(postId, reaction);

      // Update in both newPosts and posts
      setNewPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, reactions: res.reactions, userReaction: res.userReaction }
            : p,
        ),
      );
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, reactions: res.reactions, userReaction: res.userReaction }
            : p,
        ),
      );
    } catch (error) {
      console.error("Error sending reaction:", error);
    }
  };

  // -----------------------------
  // Initial fetch
  // -----------------------------
  useEffect(() => {
    if (posts.length === 0 && hasMore) {
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -----------------------------
  // Add new post at top (after upload)
  // -----------------------------
  const addNewPost = (newPost) => {
    // Prepend new post to newPosts list
    setNewPosts((prev) => [newPost, ...prev]);
  };

  // Optional: merge newPosts into posts if needed (e.g., after user sees them)
  // Not required for immediate feed display

  return (
    <div
      id="home-scroll-container"
      className="flex justify-center overflow-y-auto noscroll-bar h-[calc(100vh-56px)]   bg-gray-50"
    >
      <div className="lg:w-md xl:w-xl w-[96vw]">
        {/* Top section */}
        <HomeTop currentUser={loggedInUser} addNewPost={addNewPost} />

        {/* Stories */}
        <StorySection />

        {/* New posts always appear at top */}
        {newPosts.map((post) => (
          <PostCard
            key={`new-${post._id}`}
            post={post}
            updatePost={updatePost}
          />
        ))}

        {/* Infinite scroll older posts */}
        <InfiniteScroll
          dataLength={posts.length}
          next={getPosts}
          hasMore={hasMore}
          loader={<h4 className="text-center mt-4">Loading...</h4>}
          scrollableTarget="home-scroll-container"
        >
          {posts.map((post, index) => (
            <PostCard
              key={`old-${post._id}-${index}`}
              post={post}
              updatePost={updatePost}
            />
          ))}
        </InfiniteScroll>

        {/* No more posts message */}
        {!hasMore && posts.length > 0 && (
          <p className="text-center my-4 text-gray-500">No more posts</p>
        )}
      </div>
    </div>
  );
}
