import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../config/env";

export default function UserAvatar({
  user,
  size = 48,
  fallbackToRedux = true,
}) {
  const authUser = useSelector((state) => state.auth.user);
  const [imageLoaded, setImageLoaded] = useState(true);

  // If fallbackToRedux and the user is logged in, always use the latest profile picture
  const isCurrentUser = fallbackToRedux && authUser?._id === user?._id;
  
  // Check for profilePicture first, then profilePic (backend might use either)
  let profilePicture = isCurrentUser
    ? (authUser?.profilePicture || authUser?.profilePic)
    : (user?.profilePicture || user?.profilePic);

  const sizeInPixels = `${size * 4}px`; // size is in tailwind units (4px each)

  // Debug logging
  // eslint-disable-next-line no-undef
  if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("UserAvatar Debug:", {
      userName: user?.name,
      userId: user?._id,
      profilePicture,
      imageLoaded,
    });
  }

  // Check if we have a valid image URL
  const hasValidImage = profilePicture && 
    profilePicture !== "null" && 
    profilePicture.trim() !== "" && 
    imageLoaded;

  if (hasValidImage) {
    // Handle image URL construction
    let pic = profilePicture;
    
    // If it's a relative path or doesn't start with http, prepend BACKEND_URL
    if (!pic.startsWith("http") && !pic.startsWith("/uploads")) {
      pic = `${BACKEND_URL}/${pic}`;
    } else if (!pic.startsWith("http") && pic.startsWith("/uploads")) {
      // It's already an absolute path from backend
      pic = `${BACKEND_URL}${pic}`;
    }

    return (
      <img
        src={pic}
        alt={user?.name || "User"}
        style={{
          width: sizeInPixels,
          height: sizeInPixels,
        }}
        className="rounded-full object-cover"
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          console.error("Image load error:", { pic, error: e });
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
