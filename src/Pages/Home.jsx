// src/pages/HomePage.jsx
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import PostCard from "../Components/Home/PostCard";
import HomeTop from "../Components/Home/HomeTop";

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Use full backend URL instead of relative path
      const res = await axios.get(
        `http://localhost:3000/api/posts?page=${page}&limit=5`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      console.log("📦 Full API response:", res.data);

      const newPosts = Array.isArray(res.data.posts) ? res.data.posts : [];

      setPosts((prev) => [...prev, ...newPosts]);
      setHasMore(res.data.hasMore ?? newPosts.length > 0);
      setPage((prev) => prev + 1);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(
        "❌ Error fetching posts:",
        err.response?.data || err.message
      );
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex justify-center min-h-screen mt-16">
      <div className="w-full max-w-2xl">
        <HomeTop />
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={loading && <h4 className="text-center mt-4">Loading...</h4>}
          endMessage={
            <p className="text-center text-gray-500 mt-4">No more posts</p>
          }
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </InfiniteScroll>

        {/* Optional: show message if no posts */}
        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No posts available yet.
          </p>
        )}
      </div>
    </div>
  );
}
