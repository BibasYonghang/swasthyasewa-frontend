import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../config/env";

export default function UserAvatar({
  user,
  size = 48,
  fallbackToRedux = true,
}) {
  const authUser = useSelector((state) => state.auth.user);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fetchedUserData, setFetchedUserData] = useState(null);

  // If fallbackToRedux and the user is logged in, always use the latest profile picture
  const isCurrentUser = fallbackToRedux && authUser?._id === user?._id;

  // Fetch user data if profile picture is missing
  useEffect(() => {
    const profilePic = isCurrentUser
      ? authUser?.profilePicture || authUser?.profilePic
      : user?.profilePicture || user?.profilePic;

    // If we don't have profile picture and have a user ID, try to fetch full user data
    if (!profilePic && user?._id && !isCurrentUser) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/api/users/${user._id}`,
          );
          setFetchedUserData(response.data);
        } catch (err) {
          console.log("UserAvatar - Failed to fetch user data:", err.message);
        }
      };
      fetchUserProfile();
    }
  }, [user?._id, isCurrentUser, authUser, user]);

  // Memoize image URL calculation to avoid unnecessary recalculations
  const imageUrl = useMemo(() => {
    const userData = fetchedUserData || user;

    let profilePic = isCurrentUser
      ? authUser?.profilePicture || authUser?.profilePic
      : userData?.profilePicture || userData?.profilePic;

    if (!profilePic) {
      // Check other possible field names
      profilePic = isCurrentUser
        ? authUser?.image || authUser?.avatar || authUser?.photo
        : userData?.image || userData?.avatar || userData?.photo;
    }

    if (profilePic && profilePic !== "null" && profilePic.trim() !== "") {
      // Construct the full URL
      let finalUrl = profilePic;

      if (!finalUrl.startsWith("http")) {
        finalUrl = `${BACKEND_URL}${finalUrl.startsWith("/") ? "" : "/"}${finalUrl}`;
      }

      return finalUrl;
    }
    return null;
  }, [user, authUser, isCurrentUser, fetchedUserData]);

  const sizeInPixels = `${size * 4}px`; // size is in tailwind units (4px each)

  if (imageUrl && imageLoaded) {
    return (
      <img
        src={imageUrl}
        alt={user?.name || "User"}
        style={{
          width: sizeInPixels,
          height: sizeInPixels,
        }}
        className="rounded-full object-cover shrink-0"
        onLoad={() => {
          setImageLoaded(true);
        }}
        onError={(e) => {
          console.error("UserAvatar - Image load error:", {
            url: imageUrl,
            user: user?.name,
            error: e,
          });
          e.target.onerror = null;
          e.target.src = "/default-user.png";
          setImageLoaded(false);
        }}
      />
    );
  }

  // Try to show image even if not confirmed loaded
  if (imageUrl && !imageLoaded) {
    return (
      <img
        src={imageUrl}
        alt={user?.name || "User"}
        style={{
          width: sizeInPixels,
          height: sizeInPixels,
        }}
        className="rounded-full object-cover"
        onLoad={() => {
          setImageLoaded(true);
        }}
        onError={(e) => {
          console.error("UserAvatar - Image error, falling back:", imageUrl);
          e.target.onerror = null;
          e.target.src = "/default-user.png";
          setImageLoaded(false);
        }}
      />
    );
  }

  // Default avatar with first letter
  const initial = (user?.name || "U").charAt(0).toUpperCase();
  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  const index = user?._id ? user._id.charCodeAt(0) % colors.length : 0;

  return (
    <div
      style={{
        width: sizeInPixels,
        height: sizeInPixels,
      }}
      className={`rounded-full ${colors[index]} flex items-center justify-center text-white font-semibold text-lg`}
    >
      {initial}
    </div>
  );
}
