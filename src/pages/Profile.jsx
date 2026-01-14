import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Camera, MapPin, Users, CalendarDays } from "lucide-react";

import PostCard from "../Components/Home/PostCard";
import { BACKEND_URL } from "../config/env.js";
import { setUser } from "../redux/auth/AuthSlice.jsx";

export default function Profile() {
  const { id: routeId } = useParams();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);

  const [user, setUserState] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Posts");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);

  const profileId = routeId || loggedInUser?._id;

  useEffect(() => {
    if (!profileId) {
      setLoading(false);
      return;
    }

    fetchProfileData(profileId);
  }, [profileId]);

  const fetchProfileData = async (profileId) => {
    try {
      setLoading(true);
      const userRes = await axios.get(`${BACKEND_URL}/api/users/${profileId}`);
      const userData = userRes.data || {};
      userData.followers = userData.followers || [];
      setUserState(userData);
      const postsRes = await axios.get(
        `${BACKEND_URL}/api/posts?userId=${profileId}`
      );
      const allPosts = postsRes.data?.posts || [];
      const userPosts = allPosts.filter(
        (post) =>
          post.user?._id === profileId ||
          post.sharedFrom?.user?._id === profileId
      );
      userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(userPosts);
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setUserState(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file || !profileId) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      if (type === "cover") setUploadingCover(true);
      else setUploadingProfile(true);

      await axios.post(
        `${BACKEND_URL}/api/users/${profileId}/upload-${type}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Refetch updated user
      const refreshedUser = (
        await axios.get(`${BACKEND_URL}/api/users/${profileId}`)
      ).data;
      setUserState(refreshedUser);

      // Update Redux if this is the logged-in user
      if (loggedInUser?._id === profileId) {
        dispatch(setUser(refreshedUser));
      }
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
    } finally {
      if (type === "cover") setUploadingCover(false);
      else setUploadingProfile(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!profileId) return <div>Please login</div>;
  if (!user) return <div>Profile not found</div>;

  return (
    <div className="flex-col items-center justify-center w-full bg-gray-100 text-black">
      <div className="relative mx-auto rounded-md max-w-5xl h-60 bg-gray-300">
        <img
          src={user.coverPicture || "/default-cover.jpg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {loggedInUser?._id === profileId && (
          <label className="absolute bottom-4 right-4 bg-white p-2 rounded-full cursor-pointer">
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
      <div className="max-w-5xl mx-auto px-4 -mt-15">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 bg-gray-300">
            <img
              src={user.profilePicture || "/default-profile.png"}
              alt={user.name || "User"}
              className="w-full h-full object-cover"
            />
            {loggedInUser?._id === profileId && (
              <label className="absolute bottom-2 right-2 bg-white p-1 rounded-full cursor-pointer">
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
            <h1 className="sm:text-3xl text-2xl font-bold text-gray-900">
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
        <div className="mt-6 border-b border-gray-300 flex text-gray-500 font-medium">
          {["Posts", "About", "Friends", "Photos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 sm:px-6 hover:cursor-pointer transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                  : "hover:text-gray-800 hover:bg-gray-200 rounded-md"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Posts" ? (
          <div className="mt-6 space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post._id} post={post} updatePost={() => {}} />
              ))
            ) : (
              <div className="text-center py-12">No posts yet.</div>
            )}
          </div>
        ) : (
          <div className="mt-6 text-center py-12">
            {activeTab} content will be shown here.
          </div>
        )}
      </div>
    </div>
  );
}
