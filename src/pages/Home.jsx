// src/pages/HomePage.jsx
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import HomeTop from "../Components/Home/HomeTop.jsx";
import {
  CornerUpRight,
  MessageCircle,
  Share,
  Share2,
  ThumbsUp,
} from "lucide-react";

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
      <div className="w-full max-w-lg ">
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
          {posts.map(({ user, content, images, likes, _id }) => (
            <div
              key={_id}
              className="bg-white shadow-md rounded-xl text-black p-4 mb-4"
            >
              {/* Top section: profile */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/default-user.png"
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-sm text-gray-500"></p>
                </div>
              </div>

              {/* Text content */}
              {content && (
                <p className="text-gray-800 mb-3 whitespace-pre-line leading-relaxed">
                  {content}
                </p>
              )}

              {/* Image (height auto, adjusts dynamically like Facebook) */}
              {images && (
                <img
                  src={images}
                  alt=""
                  className="w-full rounded-xl object-cover"
                />
              )}
              <div className="h-10 w-full justify-between flex">
                <div className="hover:cursor-pointer w-[30%] justify-center items-center flex hover:bg-gray-100 p-2 rounded-md transition-all duration-150">
                  <p>{likes}</p>
                  <div className="flex">
                    <ThumbsUp /> Like
                  </div>
                </div>
                <div className="hover:cursor-pointer  w-[30%] justify-center items-center flex hover:bg-gray-100 p-2 rounded-md transition-all duration-150">
                  <p>{likes}</p>
                  <div className="flex">
                    <MessageCircle /> Comment
                  </div>
                </div>
                <div className="hover:cursor-pointer justify-center items-center flex  w-[30%] hover:bg-gray-100 p-2 rounded-md transition-all duration-150">
                  <p>{likes}</p>
                  <div className="flex">
                    <CornerUpRight /> Share
                  </div>
                </div>
              </div>
            </div>
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
