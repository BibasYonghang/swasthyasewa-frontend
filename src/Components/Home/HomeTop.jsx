import {
  GalleryThumbnails,
  GalleryVerticalIcon,
  Image,
  PhoneOutgoing,
} from "lucide-react";
import React from "react";

export default function HomeTop() {
  return (
    <>
      <div className="h-16 rounded-xl bg-white mb-2 gap-3 flex items-center">
        <div className="bg-gray-200 p-5 w-10 rounded-full ml-3">
          <img src="" alt="" className=" h-full w-full" />
        </div>
        <input
          type="text"
          placeholder="What's on Your Mind ?"
          className="bg-gray-200 p-2 w-[35vw] pl-4 rounded-full"
        />
        <button className="hover:cursor-pointer">
          <Image size={30} className="text-green-500" />
        </button>
      </div>
    </>
  );
}
