import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux"; // ✅ Import Redux hook
import { fetchPosts, sendReaction } from "../config/api/posts.js";
import HomeTop from "../Components/Home/HomeTop.jsx";
import PostCard from "../Components/Home/PostCard.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Get the logged-in user from Redux
  const loggedInUser = useSelector((state) => state.auth.user);

  const getPosts = async () => {
    const data = await fetchPosts(page);
    setPosts((prev) => [...prev, ...(data.posts || [])]);
    setPage(page + 1);
    setHasMore(data.hasMore);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const updatePost = async (postId, reaction) => {
    const res = await sendReaction(postId, reaction);
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, reactions: res.reactions, userReaction: res.userReaction }
          : p
      )
    );
  };

  return (
    <div className="flex justify-center min-h-screen mt-2 relative">
      <div className="w-full max-w-lg">
        {/* ✅ Pass logged-in user to HomeTop */}
        <HomeTop currentUser={loggedInUser} />
        <InfiniteScroll
          dataLength={posts.length}
          next={getPosts}
          hasMore={hasMore}
          loader={<h4 className="text-center mt-4">Loading...</h4>}
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} updatePost={updatePost} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
