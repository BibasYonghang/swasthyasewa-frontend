// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Camera, MapPin, Users, CalendarDays } from "lucide-react";
import PostCard from "../Components/Home/PostCard";

export default function Profile() {
  const { id: routeId } = useParams();
  const loggedInUser = useSelector((state) => state.auth.user);

  // Use routeId if available, else logged-in user
  const id = routeId || loggedInUser?._id;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Posts");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);

  useEffect(() => {
    if (!id) return; // Wait for valid ID

    const fetchData = async () => {
      try {
        // Fetch user info
        const userRes = await axios.get(`http://localhost:3000/api/users/${id}`);
        const userData = userRes.data || {};
        userData.followers = userData.followers || [];
        setUser(userData);

        // Fetch posts for this user
        const postsRes = await axios.get(
          `http://localhost:3000/api/posts?userId=${id}`
        );
        const allPosts = postsRes.data?.posts || [];

        const userPosts = allPosts.filter(
          (post) => post.user?._id === id || post.sharedFrom?.user?._id === id
        );

        userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(userPosts);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdatePost = async (postId, reaction) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/posts/${postId}/reaction`,
        { reaction }
      );

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postId
            ? { ...p, reactions: res.data.reactions, userReaction: res.data.userReaction }
            : p
        )
      );
    } catch (err) {
      console.error("Error updating reaction:", err);
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      type === "cover" ? setUploadingCover(true) : setUploadingProfile(true);

      const res = await axios.post(
        `http://localhost:3000/api/users/${id}/upload-${type}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUser((prev) => ({
        ...prev,
        [type === "cover" ? "coverPicture" : "profilePicture"]: res.data.url,
      }));
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
    } finally {
      type === "cover" ? setUploadingCover(false) : setUploadingProfile(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!id) return <div className="text-center mt-10">No user selected</div>;
  if (!user) return <div className="text-center mt-10">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Cover Photo */}
      <div className="relative w-full h-60 bg-gray-300">
        <img
          src={user.coverPicture || "/default-cover.jpg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {loggedInUser?._id === id && (
          <label className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer">
            {uploadingCover ? "Uploading..." : <Camera size={20} />}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "cover")}
            />
          </label>
        )}
      </div>

      {/* Profile Info */}
      <div className="max-w-5xl mx-auto px-4 -mt-20">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-200">
            <img
              src={user.profilePicture || "/default-profile.png"}
              alt={user.name || "User"}
              className="w-full h-full object-cover"
            />
            {loggedInUser?._id === id && (
              <label className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer">
                {uploadingProfile ? "Uploading..." : <Camera size={18} />}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "profile")}
                />
              </label>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user.name || "Unknown"}</h1>
            <p className="text-gray-600">
              @{user.username || "username"} | {user.bio || "No bio"}
            </p>
            <div className="flex gap-4 mt-2 text-gray-700 text-sm flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {user.location || "Unknown"}
              </span>
              <span className="flex items-center gap-1">
                <Users size={16} /> {user.followers?.length || 0} followers
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={16} /> Joined{" "}
                {user.createdAt ? new Date(user.createdAt).getFullYear() : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b flex gap-8 text-gray-700 font-medium">
          {["Posts", "About", "Friends", "Photos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 ${
                activeTab === tab
                  ? "border-b-2 border-black font-semibold"
                  : "hover:border-b-2 hover:border-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Posts" && (
          <div className="mt-6 space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  updatePost={handleUpdatePost}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">No posts yet.</p>
            )}
          </div>
        )}

        {activeTab !== "Posts" && (
          <div className="mt-6 text-center text-gray-500">
            {activeTab} content will be shown here.
          </div>
        )}
      </div>
    </div>
  );
}
