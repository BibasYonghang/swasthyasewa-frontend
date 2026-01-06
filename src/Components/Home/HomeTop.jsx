// src/Components/Home/HomeTop.jsx
import { Image } from "lucide-react";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomeTop() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);

  if (!currentUser || !currentUser._id) return null;

  const handleInputClick = () => navigate("/create-post");
  const handleImageClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    localStorage.setItem("selectedFiles", JSON.stringify(files));
    navigate("/create-post");
  };

  return (
    <div className="h-16 rounded-xl bg-white mb-2 gap-1 flex items-center px-3">
      <Link
        to={`/profile/${currentUser._id}`}
        className="bg-gray-200 w-10 sm:w-12 md:w-14 lg:w-18 xl:w-22 h-10 rounded-full overflow-hidden"
      >
        <img
          src={
            currentUser.profilePicture ||
            currentUser.profilePic ||
            "/default-user.png"
          }
          alt={currentUser.name || "User"}
          className="w-full h-full object-cover"
        />
      </Link>
      <input
        type="text"
        placeholder="What's on your mind?"
        className="bg-gray-200 p-2 pl-4 w-[65vw] outline-none rounded-full cursor-pointer"
        onClick={handleInputClick}
        readOnly
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
      />
      <button className="hover:cursor-pointer mx-2" onClick={handleImageClick}>
        <Image size={30} className="text-green-500" />
      </button>
    </div>
  );
}
