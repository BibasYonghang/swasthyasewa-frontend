// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Camera, MapPin, Users, CalendarDays } from "lucide-react";
import PostCard from "../Components/Home/PostCard";

export default function Profile() {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Posts");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);

    const API = import.meta.env.VITE_API_BASE;


  useEffect(() => {
    console.log("Profile useEffect - Route ID:", routeId);
    console.log("Profile useEffect - Logged in user:", loggedInUser);

    // If we have a route ID, use that
    if (routeId) {
      console.log("Using route ID:", routeId);
      fetchProfileData(routeId);
      return;
    }

    // If no route ID, check if we have a valid logged-in user
    if (loggedInUser && loggedInUser._id) {
      console.log("Using logged in user ID:", loggedInUser._id);
      fetchProfileData(loggedInUser._id);
      return;
    }

    // If we get here, we have no valid ID
    console.log("No valid ID available");
    setLoading(false);
  }, [routeId, loggedInUser]);

  const fetchProfileData = async (profileId) => {
    if (!profileId) {
      console.error("No profile ID provided to fetchProfileData");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching data for profile ID:", profileId);

      // Fetch user info
      const userRes = await axios.get(
        `${API}/api/users/${profileId}`
      );
      const userData = userRes.data || {};
      userData.followers = userData.followers || [];
      setUser(userData);

      // Fetch posts for this user
      const postsRes = await axios.get(
        `${API}/api/posts?userId=${profileId}`
      );
      const allPosts = postsRes.data?.posts || [];

      const userPosts = allPosts.filter(
        (post) =>
          post.user?._id === profileId ||
          post.sharedFrom?.user?._id === profileId
      );

      userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(userPosts);

      console.log("Data fetched successfully");
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (postId, reaction) => {
    try {
      const res = await axios.post(
        `${API}/api/posts/${postId}/reaction`,
        { reaction }
      );

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                reactions: res.data.reactions,
                userReaction: res.data.userReaction,
              }
            : p
        )
      );
    } catch (err) {
      console.error("Error updating reaction:", err);
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    const profileId = routeId || loggedInUser?._id;

    if (!file || !profileId) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      if (type === "cover") {
        setUploadingCover(true);
      } else {
        setUploadingProfile(true);
      }

      const res = await axios.post(
        `${API}/api/users/${profileId}/upload-${type}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        [type === "cover" ? "coverPicture" : "profilePicture"]: res.data.url,
      }));
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
    } finally {
      if (type === "cover") {
        setUploadingCover(false);
      } else {
        setUploadingProfile(false);
      }
    }
  };

  // Determine current profile ID for rendering
  const currentProfileId =
    routeId || (loggedInUser?._id ? loggedInUser._id : null);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // No ID state - user not logged in and no route ID
  if (!currentProfileId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p className="text-lg">Please log in to view profiles</p>
          <p className="text-sm mt-2">
            You need to be logged in to access profiles
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // User not found state
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p className="text-lg">Profile not found</p>
          <p className="text-sm mt-2">The user profile could not be loaded</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Cover Photo */}
      <div className="relative w-full h-60 bg-gray-300">
        <img
          src={user.coverPicture || "/default-cover.jpg"}
          alt="Cover"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/default-cover.jpg";
          }}
        />
        {loggedInUser?._id === currentProfileId && (
          <label className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
            {uploadingCover ? (
              <span className="text-xs">Uploading...</span>
            ) : (
              <Camera size={20} />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "cover")}
              disabled={uploadingCover}
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
              onError={(e) => {
                e.target.src = "/default-profile.png";
              }}
            />
            {loggedInUser?._id === currentProfileId && (
              <label className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                {uploadingProfile ? (
                  <span className="text-xs">...</span>
                ) : (
                  <Camera size={18} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "profile")}
                  disabled={uploadingProfile}
                />
              </label>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {user.name || "Unknown User"}
            </h1>
            <p className="text-gray-600 mt-1">
              @{user.username || "username"} {user.bio && "| " + user.bio}
            </p>
            <div className="flex gap-4 mt-2 text-gray-700 text-sm flex-wrap">
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {user.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Users size={16} />
                {user.followers?.length || 0} followers
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={16} />
                Joined{" "}
                {user.createdAt
                  ? new Date(user.createdAt).getFullYear()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-300 flex gap-8 text-gray-700 font-medium">
          {["Posts", "About", "Friends", "Photos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                  : "hover:text-gray-900"
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
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No posts yet.</p>
                <p className="text-gray-400 text-sm mt-2">
                  When {user.name || "this user"} posts something, it will
                  appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab !== "Posts" && (
          <div className="mt-6 text-center py-12">
            <p className="text-gray-500">
              {activeTab} content will be shown here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
