import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../config/env";

export default function UserAvatar({
  user,
  size = 48,
  fallbackToRedux = true,
}) {
  const authUser = useSelector((state) => state.auth.user);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // If fallbackToRedux and the user is logged in, always use the latest profile picture
  const isCurrentUser = fallbackToRedux && authUser?._id === user?._id;
  
  useEffect(() => {
    // Check for profilePicture first, then profilePic (backend might use either)
    let profilePic = isCurrentUser
      ? (authUser?.profilePicture || authUser?.profilePic)
      : (user?.profilePicture || user?.profilePic);

    console.log("UserAvatar - Full user data:", { user, authUser, isCurrentUser, profilePic });

    // If we don't have a profile picture, try to find any image field
    if (!profilePic) {
      // Check other possible field names
      profilePic = isCurrentUser
        ? (authUser?.image || authUser?.avatar || authUser?.photo)
        : (user?.image || user?.avatar || user?.photo);
    }

    let newImageUrl = null;
    if (profilePic && 
        profilePic !== "null" && 
        profilePic.trim() !== "") {
      
      // Construct the full URL
      let finalUrl = profilePic;
      
      if (!finalUrl.startsWith("http")) {
        // If it's a relative path, add the backend URL
        finalUrl = `${BACKEND_URL}${finalUrl.startsWith('/') ? '' : '/'}${finalUrl}`;
      }

      console.log("UserAvatar - Constructed URL:", finalUrl);
      newImageUrl = finalUrl;
    } else {
      console.log("UserAvatar - No valid profile picture found");
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setImageUrl(newImageUrl);
    if (!newImageUrl) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setImageLoaded(false);
    }
  }, [user, authUser, isCurrentUser]);

  const sizeInPixels = `${size * 4}px`; // size is in tailwind units (4px each)

  // If we have an image URL and it loaded successfully
  if (imageUrl && imageLoaded) {
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
          console.log("UserAvatar - Image loaded successfully:", imageUrl);
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
          console.log("UserAvatar - Image loaded:", imageUrl);
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
  
  console.log("UserAvatar - Showing fallback initial:", {
    name: user?.name,
    initial,
    userId: user?._id,
  });

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
