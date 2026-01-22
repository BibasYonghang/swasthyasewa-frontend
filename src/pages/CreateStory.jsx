import React, { useRef, useState, useEffect } from "react";
import { Camera, X, Type, Film, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStories } from "../context/StoryContext";

export default function CreateStory() {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const { addStory } = useStories();

  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    _id: "default_id",
    username: "Anonymous",
    userImage: "https://randomuser.me/api/portraits/lego/1.jpg",
  };

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [textStory, setTextStory] = useState("");
  const [activeTab, setActiveTab] = useState("create");
  const [selectedBackground, setSelectedBackground] = useState(0);

  const backgrounds = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  ];

  // Focus textarea on text tab
  useEffect(() => {
    if (activeTab === "text" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [activeTab]);

  // Handle file selection (image/video)
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedMedia({ file, url: reader.result });
      setMediaType(file.type.startsWith("video") ? "video" : "image");
      setActiveTab("preview");
    };
    reader.readAsDataURL(file);
  };

  // Upload media story
  const uploadStory = async () => {
    if (!selectedMedia) return;

    // Create story object
    const newStory = {
      user: {
        _id: currentUser._id, // must be MongoDB ObjectId from logged-in user
        username: currentUser.username,
        userImage: currentUser.userImage,
      },
      stories: [
        {
          id: `${Date.now()}`,
          type: mediaType,
          url: selectedMedia.url,
          viewed: false,
          duration: mediaType === "video" ? 8000 : 5000,
          createdAt: Date.now(),
        },
      ],
    };

    addStory(newStory); // Add story to context
    navigate("/home"); // Go back to home
  };

  // Upload text story
  const uploadTextStory = async () => {
    if (!textStory.trim()) return;

    const newStory = {
      user: {
        _id: currentUser._id,
        username: currentUser.username,
        userImage: currentUser.userImage,
      },
      stories: [
        {
          id: `${Date.now()}`,
          type: "text",
          text: textStory,
          background: backgrounds[selectedBackground],
          duration: 5000,
          viewed: false,
          createdAt: Date.now(),
        },
      ],
    };

    addStory(newStory);
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            {activeTab !== "create" && (
              <button
                onClick={() => setActiveTab("create")}
                className="hover:bg-gray-100 rounded-full p-2"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-xl font-bold">Create story</h2>
          </div>
          <Link to="/home" className="hover:bg-gray-100 rounded-full p-2">
            <X className="w-5 h-5" />
          </Link>
        </div>

        <div className="p-6">
          {activeTab === "create" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 p-6 rounded-xl"
                >
                  <Camera />
                  <p>Photo</p>
                </button>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 p-6 rounded-xl"
                >
                  <Film />
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
                className="w-full border-2 p-6 rounded-xl"
              >
                <Type />
                <p>Create text story</p>
              </button>
            </div>
          )}

          {activeTab === "preview" && selectedMedia && (
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
                className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg"
              >
                Share to Story
              </button>
            </>
          )}

          {activeTab === "text" && (
            <>
              <div
                className="h-96 flex items-center justify-center"
                style={{ background: backgrounds[selectedBackground] }}
              >
                <textarea
                  ref={textareaRef}
                  value={textStory}
                  onChange={(e) => setTextStory(e.target.value)}
                  className="bg-transparent text-white text-2xl text-center w-full h-full"
                />
              </div>
              <button
                onClick={uploadTextStory}
                className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg"
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
