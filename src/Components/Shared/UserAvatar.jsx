import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../config/env";

export default function UserAvatar({
  user,
  size = 48,
  fallbackToRedux = true,
}) {
  const authUser = useSelector((state) => state.auth.user);

  // If fallbackToRedux and the user is logged in, always use the latest profile picture
  const isCurrentUser = fallbackToRedux && authUser?._id === user?._id;
  const profilePicture = isCurrentUser
    ? authUser.profilePicture
    : user?.profilePicture;

  const sizeInPixels = `${size * 4}px`; // size is in tailwind units (4px each)

  if (profilePicture && profilePicture !== "null") {
    const pic = profilePicture.startsWith("http")
      ? profilePicture
      : `${BACKEND_URL}/${profilePicture}`;
    return (
      <img
        src={pic}
        alt={user?.name || "User"}
        style={{
          width: sizeInPixels,
          height: sizeInPixels,
        }}
        className="rounded-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-user.png";
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
