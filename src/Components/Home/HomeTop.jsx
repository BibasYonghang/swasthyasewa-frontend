import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../config/env.js";
import { setUser } from "../../redux/auth/AuthSlice.jsx";

export default function HomeTop() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.auth.user);
  const [currentUser, setCurrentUser] = useState(loggedInUser || null);

  // Fetch latest user data when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      if (!loggedInUser?._id) return;
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/users/${loggedInUser._id}`,
        );
        setCurrentUser(res.data);
        dispatch(setUser(res.data));
      } catch (err) {
        console.error("Error fetching logged-in user:", err);
      }
    };

    fetchUser();
  }, [loggedInUser?._id, dispatch]);

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
    <div className="h-16 rounded-xl bg-white mb-2 flex items-center px-3 gap-2">
      {/* Profile Avatar */}
      <Link
        to={`/profile/${currentUser._id}`}
        className="w-12 h-12 rounded-full overflow-hidden shrink-0"
      >
        <img
          src={currentUser.profilePicture || "/default-user.png"}
          alt={currentUser.name || "User"}
          className="w-full h-full object-cover rounded-full"
        />
      </Link>

      {/* Post Input */}
      <input
        type="text"
        placeholder="What's on your mind?"
        className="bg-gray-200 p-2 pl-4 w-[65vw] outline-none rounded-full cursor-pointer"
        onClick={handleInputClick}
        readOnly
      />

      {/* Image Upload */}
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
