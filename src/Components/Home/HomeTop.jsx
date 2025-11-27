import {
  GalleryThumbnails,
  GalleryVerticalIcon,
  Image,
  PhoneOutgoing,
} from "lucide-react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function HomeTop() {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files); // Here you can handle the uploaded files
    // For example, send them to your backend or display a preview
  };

  return (
    <div className="h-16 rounded-xl bg-white mb-2 gap-1 flex items-center">
      <Link to="/profile" className="bg-gray-200 p-5 w-10 rounded-full mx-3">
        <img src="" alt="" className=" h-full w-full" />
      </Link>

      <input
        type="text"
        placeholder="What's on Your Mind ?"
        className="bg-gray-200 p-2 w-[65vw] sm:w-[75vw] md:w-[60vw] lg:w-[42vw] rounded-full"
      />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*" // Accept images and videos
        multiple // Allow multiple files
        onChange={handleFileChange}
      />

      {/* Button that triggers file input */}
      <button className="hover:cursor-pointer mx-2" onClick={handleImageClick}>
        <Image size={30} className="text-green-500" />
      </button>
    </div>
  );
}
