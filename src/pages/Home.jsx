import React, { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { fetchPosts, sendReaction } from "../config/api/posts.js";
import HomeTop from "../Components/Home/HomeTop.jsx";
import PostCard from "../Components/Home/PostCard.jsx";
import StorySection from "../Components/Home/StorySection.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loggedInUser = useSelector((state) => state.auth.user);

  const getPosts = useCallback(async () => {
    const data = await fetchPosts(page);

    setPosts((prev) => [...prev, ...(data.posts || [])]);
    setPage((prev) => prev + 1);
    setHasMore(data.hasMore);
  }, [page]);

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

  useEffect(() => {
    if (posts.length === 0 && hasMore) {
      const fetchInitialPosts = async () => {
        await getPosts();
      };
      fetchInitialPosts();
    }
  }, [getPosts, hasMore, posts.length]);

  return (
    <div className="flex justify-center min-h-screen mt-2 relative">
      <div className="lg:w-md xl:w-xl w-[96vw]">
        <HomeTop currentUser={loggedInUser} />
        <StorySection />

        <InfiniteScroll
          dataLength={posts.length}
          next={getPosts}
          hasMore={hasMore}
          loader={<h4 className="text-center mt-4">Loading...</h4>}
        >
          {posts.map((post, index) => (
            <PostCard
              key={`${post._id}-${index}`}
              post={post}
              updatePost={updatePost}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
