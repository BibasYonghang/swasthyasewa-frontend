import React, { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { fetchPosts, sendReaction } from "../config/api/posts.js";
import HomeTop from "../Components/Home/HomeTop.jsx";
import PostCard from "../Components/Home/PostCard.jsx";
import StorySection from "../Components/Home/StorySection.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loggedInUser = useSelector((state) => state.auth.user);

  const getPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await fetchPosts(page);

      setPosts((prevPosts) => {
        const existingIds = new Set([
          ...prevPosts.map((p) => p._id),
          ...newPosts.map((p) => p._id),
        ]);

        const filteredPosts = (data.posts || []).filter(
          (p) => !existingIds.has(p._id),
        );

        return [...prevPosts, ...filteredPosts];
      });

      setHasMore(data.hasMore);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading, newPosts]);

  const updatePost = async (postId, reaction) => {
    try {
      const res = await sendReaction(postId, reaction);

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

  useEffect(() => {
    if (posts.length === 0 && hasMore) {
      getPosts();
    }
  }, []);

  const addNewPost = (newPost) => {
    setNewPosts((prev) => {
      if (prev.some((p) => p._id === newPost._id)) return prev;
      return [newPost, ...prev];
    });
  };

  return (
    <div
      id="home-scroll-container"
      className="flex justify-center overflow-y-auto noscroll-bar h-[calc(100vh-56px)]   bg-gray-50"
    >
      <div className="lg:w-md xl:w-xl w-[96vw]">
        <HomeTop currentUser={loggedInUser} addNewPost={addNewPost} />
        <StorySection />

        {newPosts.map((post) => (
          <PostCard
            key={`new-${post._id}`}
            post={post}
            updatePost={updatePost}
          />
        ))}

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

        {!hasMore && posts.length > 0 && (
          <p className="text-center my-4 text-gray-500">No more posts</p>
        )}
      </div>
    </div>
  );
}
