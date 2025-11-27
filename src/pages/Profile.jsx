import React from "react";
import { Camera, MapPin, Users, CalendarDays } from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Cover Photo */}
      <div className="relative w-full h-60 bg-gray-300">
        <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md">
          <Camera size={20} />
        </button>
      </div>

      {/* Profile Container */}
      <div className="max-w-5xl mx-auto px-4 -mt-20">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          {/* Profile Image */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-200">
            <img
              src="/default-profile.png"
              alt="profile"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
              <Camera size={18} />
            </button>
          </div>

          {/* Name + Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Bibas Yonghang</h1>
            <p className="text-gray-600">@bibasy | Frontend Developer</p>
            <div className="flex gap-4 mt-2 text-gray-700 text-sm">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> Nepal
              </span>
              <span className="flex items-center gap-1">
                <Users size={16} /> 2.5k followers
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={16} /> Joined 2023
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 border-b flex gap-8 text-gray-700 font-medium">
          <button className="pb-3 border-b-2 border-black">Posts</button>
          <button className="pb-3 hover:border-b-2 hover:border-gray-400">
            About
          </button>
          <button className="pb-3 hover:border-b-2 hover:border-gray-400">
            Friends
          </button>
          <button className="pb-3 hover:border-b-2 hover:border-gray-400">
            Photos
          </button>
        </div>

        {/* Posts Section */}
        <div className="mt-6 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2">Your Post</h2>
            <p className="text-gray-700">
              This is an example post on your profile page.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2">Another Post</h2>
            <p className="text-gray-700">
              You can add posts here dynamically later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
