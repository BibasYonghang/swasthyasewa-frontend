// src/pages/HomePage.jsx
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import CreatePost from "../Components/Home/CreatePost";
import PostCard from "../Components/Home/PostCard"; // Each post UI
import HomeTop from "../Components/Home/HomeTop";

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/api/posts?page=${page}&limit=5`);
      const newPosts = Array.isArray(res.data.posts) ? res.data.posts : [];

      setPosts((prev) => [...prev, ...newPosts]);
      setHasMore(res.data.hasMore ?? false);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial load
  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex justify-center  min-h-screen mt-16">
      <div className="w-full max-w-2xl">
        <HomeTop />
        {/* Create Post Box */}
        <CreatePost />

        {/* Infinite Scrolling Feed */}
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={<h4 className="text-center mt-4">Loading...</h4>}
          endMessage={
            <p className="text-center text-gray-500 mt-4">No more posts</p>
          }
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
