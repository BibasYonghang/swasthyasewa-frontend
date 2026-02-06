import React, { useRef, useState } from "react";
import { Camera, X, Type, Film } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStories } from "../context/useStories";

export default function CreateStory() {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const { addStory } = useStories();

  const rawUserJson = localStorage.getItem("user");
  const parsedUser = rawUserJson ? JSON.parse(rawUserJson) : null;

  const currentUser = {
    _id: parsedUser?._id || "default_id",
    username: parsedUser?.username || parsedUser?.name || "Anonymous",
    userImage:
      parsedUser?.userImage ||
      parsedUser?.profilePicture ||
      "https://randomuser.me/api/portraits/lego/1.jpg",
  };

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [textStory, setTextStory] = useState("");
  const [activeTab, setActiveTab] = useState("createStory");
  
  const buildStoryPayload = (storyData) => ({
    user: currentUser,
    stories: [
      {
        id: `${Date.now()}`,
        viewed: false,
        createdAt: Date.now(),
        ...storyData,
      },
    ],
  });

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedMedia({ file, url: reader.result });
      setMediaType(file.type.startsWith("video") ? "video" : "image");
      setActiveTab("media");
    };

    reader.readAsDataURL(file);
  };

  const uploadStory = () => {
    if (!selectedMedia) return;

    const payload = buildStoryPayload({
      type: mediaType,
      url: selectedMedia.url,
      duration: mediaType === "video" ? 8000 : 5000,
    });

    addStory(payload);
    navigate("/home");
  };

  const uploadTextStory = () => {
    if (!textStory.trim()) return;

    const payload = buildStoryPayload({
      type: "text",
      text: textStory,
      duration: 5000,
    });

    addStory(payload);
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-xl text-gray-800 font-bold">Create story</h2>
          </div>
          <Link to="/home" className="hover:bg-gray-100 rounded-full p-2">
            <X className="w-5 h-5" />
          </Link>
        </div>

        <div className="p-6">
          {activeTab === "createStory" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 flex items-center justify-center gap-2 border-gray-300 hover:border-gray-500 transition-all duration-100 hover:cursor-pointer p-8 rounded-xl"
                >
                  <Camera className="text-gray-700" />
                  <p>Photo</p>
                </button>

                <button
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 flex items-center justify-center gap-2 border-gray-300 hover:border-gray-500 transition-all duration-100 hover:cursor-pointer p-8 rounded-xl"
                >
                  <Film className="text-gray-700" />
                  <p>Video</p>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
              />

              <button
                onClick={() => setActiveTab("text")}
                className="w-full flex items-center justify-center gap-2 border-gray-300 hover:border-gray-500 transition-all duration-100 hover:cursor-pointer border-2 p-8 rounded-xl"
              >
                <Type className="text-gray-700" />
                <p>Create text story</p>
              </button>
            </div>
          )}

          {activeTab === "media" && selectedMedia && (
            <>
              {mediaType === "image" ? (
                <img
                  src={selectedMedia.url}
                  className="w-full h-96 object-contain"
                />
              ) : (
                <video
                  src={selectedMedia.url}
                  controls
                  className="w-full h-96"
                />
              )}

              <button
                onClick={uploadStory}
                className="w-full mt-4 hover:cursor-pointer bg-blue-500 text-white py-3 rounded-lg"
              >
                Share to Story
              </button>
            </>
          )}

          {activeTab === "text" && (
            <>
              <div className="h-96 flex items-center rounded-lg justify-center">
                <textarea
                  ref={textareaRef}
                  value={textStory}
                  onChange={(e) => setTextStory(e.target.value)}
                  className="border-none outline-none p-4 bg-sky-700 rounded-lg h-full w-full text-white text-2xl text-center focus:ring-2 focus:ring-white/50"
                />
              </div>

              <button
                onClick={uploadTextStory}
                className="w-full mt-4 hover:cursor-pointer hover:bg-blue-700 transition-colors duration-100 border-none bg-blue-600 text-white py-3 rounded-lg"
              >
                Share to Story
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
