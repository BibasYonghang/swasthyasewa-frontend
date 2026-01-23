import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Camera, MapPin, Users, CalendarDays, Plus, Edit } from "lucide-react";

import PostCard from "../Components/Home/PostCard";
import { BACKEND_URL } from "../config/env.js";
import { setUser } from "../redux/auth/AuthSlice.jsx";
import UserAvatar from "../Components/Shared/UserAvatar.jsx";

export default function Profile() {
  const { id: routeId } = useParams();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);
  console.log(loggedInUser);

  const [user, setUserState] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Posts");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const profileId = routeId || loggedInUser?._id;

  // Fetch user and posts
  useEffect(() => {
    if (!profileId || profileId === 'undefined') {
      console.warn('Invalid profileId:', profileId);
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
        `${BACKEND_URL}/api/posts?userId=${profileId}`,
      );
      const allPosts = postsRes.data?.posts || [];
      const userPosts = allPosts.filter(
        (post) =>
          post.user?._id === profileId ||
          post.sharedFrom?.user?._id === profileId,
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

  // Upload profile or cover image
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
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      // Refresh user after upload
      const refreshedUser = (
        await axios.get(`${BACKEND_URL}/api/users/${profileId}`)
      ).data;
      setUserState(refreshedUser);
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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!profileId) return;

    try {
      const updated = await axios.put(`${BACKEND_URL}/api/users/${profileId}`, {
        name: user.name,
        username: user.username,
        bio: user.bio,
        location: user.location,
      });

      setUserState(updated.data);

      if (loggedInUser?._id === profileId) {
        dispatch(setUser(updated.data));
      }

      setIsEditOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
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
      {/* Cover */}
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
      <div className="max-w-5xl mx-auto px-4 -mt-5">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 bg-gray-300">
            <UserAvatar user={user} size={40} fallbackToRedux={false} />
            {loggedInUser?._id === profileId && (
              <label className="absolute bottom-6 right-6 bg-white p-1 rounded-full cursor-pointer">
                {uploadingProfile ? (
                  <span className="text-xs">...</span>
                ) : (
                  <Camera size={25} />
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

          <div className="flex-2 flex gap-4">
            {/* EDIT PROFILE BUTTON */}
            {loggedInUser?._id === profileId && (
              <button
                onClick={() => setIsEditOpen(true)}
                className="lg:py-2 py-1 hover:cursor-pointer hover:bg-gray-400 px-4 bg-gray-300 text-black rounded-md font-semibold flex items-center gap-1"
              >
                <Edit size={18} /> Edit profile
              </button>
            )}
            {/* ADD TO STORY BUTTON - ONLY FOR OWN PROFILE */}
            {loggedInUser?._id === profileId && (
              <Link
                to="/create-story"
                className="lg:py-2 py-1 hover:cursor-pointer hover:bg-sky-700 px-4 bg-sky-600 text-white rounded-md font-semibold"
              >
                <Plus size={18} className="inline mb-1" /> Add To Story{" "}
              </Link>
            )}
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
        ) : activeTab === "About" ? (
          <div className="mt-6 text-left p-4 bg-white rounded shadow">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            {user.bio && (
              <p>
                <strong>Bio:</strong> {user.bio}
              </p>
            )}
            {user.location && (
              <p>
                <strong>Location:</strong> {user.location}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-6 text-center py-12">
            {activeTab} content will be shown here.
          </div>
        )}
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setIsEditOpen(false)}
            >
              ✕
            </button>

            <form
              onSubmit={handleProfileUpdate}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Name"
                value={user.name}
                onChange={(e) =>
                  setUserState({ ...user, name: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) =>
                  setUserState({ ...user, username: e.target.value })
                }
                className="border p-2 rounded"
              />
              <textarea
                placeholder="Bio"
                value={user.bio || ""}
                onChange={(e) => setUserState({ ...user, bio: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={user.location || ""}
                onChange={(e) =>
                  setUserState({ ...user, location: e.target.value })
                }
                className="border p-2 rounded"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
