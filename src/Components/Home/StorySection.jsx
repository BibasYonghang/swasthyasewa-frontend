import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Camera,
  X,
  Play,
  Pause,
  User,
} from "lucide-react";

const initialStories = [
  {
    id: 1,
    username: "Bibas Yonghang",
    userImage: "https://randomuser.me/api/portraits/men/1.jpg",
    stories: [
      {
        id: 101,
        type: "image",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        viewed: false,
        duration: 5000,
      },
      {
        id: 102,
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        viewed: false,
        duration: 8000,
      },
    ],
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    username: "Sushma Nepali",
    userImage: "https://randomuser.me/api/portraits/women/2.jpg",
    stories: [
      {
        id: 201,
        type: "image",
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
        viewed: true,
        duration: 5000,
      },
    ],
    createdAt: "5 hours ago",
  },
  {
    id: 3,
    username: "Alex Nepali",
    userImage: "https://randomuser.me/api/portraits/men/3.jpg",
    stories: [
      {
        id: 301,
        type: "image",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        viewed: false,
        duration: 5000,
      },
    ],
    createdAt: "1 day ago",
  },
  {
    id: 4,
    username: "Sarah Rai",
    userImage: "https://randomuser.me/api/portraits/women/4.jpg",
    stories: [
      {
        id: 401,
        type: "image",
        url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800",
        viewed: true,
        duration: 5000,
      },
    ],
    createdAt: "2 days ago",
  },
  {
    id: 5,
    username: "Mike Tyson",
    userImage: "https://randomuser.me/api/portraits/men/5.jpg",
    stories: [
      {
        id: 501,
        type: "image",
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
        viewed: false,
        duration: 5000,
      },
    ],
    createdAt: "3 days ago",
  },
];

export default function FacebookStorySection() {
  const [stories, setStories] = useState(initialStories);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressInterval = useRef(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const nextStory = useCallback(() => {
    if (!currentStory) return;

    const nextIndex = currentStory.currentStoryIndex + 1;
    const currentUserStories = currentStory.stories;

    if (nextIndex < currentUserStories.length) {
      setCurrentStory((prev) => ({
        ...prev,
        currentStoryIndex: nextIndex,
      }));
      setProgress(0);
      setIsPlaying(true);
    } else {
      const currentUserIndex = stories.findIndex(
        (user) => user.id === currentStory.user.id
      );

      if (currentUserIndex < stories.length - 1) {
        const nextUser = stories[currentUserIndex + 1];
        setCurrentStory({
          user: nextUser,
          stories: nextUser.stories,
          currentStoryIndex: 0,
        });
        setProgress(0);
        setIsPlaying(true);
      } else {
        setShowStoryViewer(false);
        setCurrentStory(null);
      }
    }
  }, [currentStory, stories]);

  const prevStory = useCallback(() => {
    if (!currentStory) return;

    const prevIndex = currentStory.currentStoryIndex - 1;

    if (prevIndex >= 0) {
      setCurrentStory((prev) => ({
        ...prev,
        currentStoryIndex: prevIndex,
      }));
      setProgress(0);
      setIsPlaying(true);
    } else {
      const currentUserIndex = stories.findIndex(
        (user) => user.id === currentStory.user.id
      );

      if (currentUserIndex > 0) {
        const prevUser = stories[currentUserIndex - 1];
        setCurrentStory({
          user: prevUser,
          stories: prevUser.stories,
          currentStoryIndex: prevUser.stories.length - 1,
        });
        setProgress(0);
        setIsPlaying(true);
      }
    }
  }, [currentStory, stories]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);

    const videoEl = videoRef.current;
    if (
      videoEl &&
      currentStory?.stories[currentStory.currentStoryIndex].type === "video"
    ) {
      if (isPlaying) {
        videoEl.pause();
      } else {
        videoEl.play();
      }
    }
  }, [currentStory, isPlaying]);

  useEffect(() => {
    if (!showStoryViewer || !currentStory || !isPlaying) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    const { duration = 5000 } =
      currentStory.stories[currentStory.currentStoryIndex];

    const startTime = Date.now();
    const interval = 50;

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval.current);
        nextStory();
      }
    }, interval);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [showStoryViewer, currentStory, isPlaying, nextStory]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (
      currentStory?.stories[currentStory.currentStoryIndex].type === "video" &&
      videoEl
    ) {
      const handleEnd = () => nextStory();
      videoEl.addEventListener("ended", handleEnd);

      if (isPlaying) {
        videoEl.play().catch(console.error);
      } else {
        videoEl.pause();
      }

      return () => videoEl.removeEventListener("ended", handleEnd);
    }
  }, [currentStory, isPlaying, nextStory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showStoryViewer) return;
      if (e.key === "ArrowRight") nextStory();
      if (e.key === "ArrowLeft") prevStory();
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        togglePlayPause();
      }
      if (e.key === "Escape") setShowStoryViewer(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showStoryViewer, nextStory, prevStory, togglePlayPause]);

  const viewStory = (user) => {
    setCurrentStory({
      user,
      stories: user.stories,
      currentStoryIndex: 0,
    });
    setShowStoryViewer(true);
    setIsPlaying(true);
    setProgress(0);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedMedia({
        file,
        url: reader.result,
        type: file.type.startsWith("video") ? "video" : "image",
      });
      setMediaType(file.type.startsWith("video") ? "video" : "image");
    };
    reader.readAsDataURL(file);
  };

  const uploadStory = async () => {
    if (!selectedMedia) return;
    setIsUploading(true);

    await new Promise((r) => setTimeout(r, 1000));

    const newStory = {
      id: Date.now(),
      type: mediaType,
      url: selectedMedia.url,
      viewed: false,
      duration: mediaType === "video" ? 8000 : 5000,
    };

    const userStory = {
      id: 0,
      username: "You",
      userImage: "",
      stories: [newStory],
      createdAt: "Just now",
    };

    setStories((prev) => [userStory, ...prev]);
    setShowAddStoryModal(false);
    setSelectedMedia(null);
    setIsUploading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg p-4 mb-2 border border-gray-200">
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          <div
            className="shrink-0 w-32 cursor-pointer"
            onClick={() => setShowAddStoryModal(true)}
          >
            <div className="relative bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="h-40 bg-linear-to-b from-gray-100 to-gray-50 flex flex-col items-center pt-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Create story
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-white"></div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full overflow-hidden border-4 border-white bg-white flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {stories.map((user) => {
            const hasUnviewed = user.stories.some((story) => !story.viewed);
            return (
              <div
                key={user.id}
                className="shrink-0 w-32 cursor-pointer"
                onClick={() => viewStory(user)}
              >
                <div className="relative rounded-lg overflow-hidden shadow-md border-2 hover:shadow-lg transition-shadow">
                  <div
                    className={`h-40 relative overflow-hidden ${
                      hasUnviewed
                        ? "border-blue-500 border-2"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={user.stories[0].url}
                      alt="story"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="absolute top-2 left-2 w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img
                      src={user.userImage}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-semibold truncate drop-shadow-md">
                      {user.username}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showStoryViewer && currentStory && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="absolute top-4 left-4 right-4 z-10 flex gap-1">
            {currentStory.stories.map((story, index) => (
              <div
                key={story.id}
                className="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full transition-all duration-300 ${
                    index === currentStory.currentStoryIndex
                      ? "bg-white"
                      : index < currentStory.currentStoryIndex
                      ? "bg-white"
                      : "bg-gray-600"
                  }`}
                  style={{
                    width:
                      index === currentStory.currentStoryIndex
                        ? `${progress}%`
                        : index < currentStory.currentStoryIndex
                        ? "100%"
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="absolute top-8 left-0 right-0 z-10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={currentStory.user.userImage}
                  alt={currentStory.user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-semibold">
                  {currentStory.user.username}
                </p>
                <p className="text-gray-300 text-sm">
                  {currentStory.user.createdAt}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowStoryViewer(false)}
              className="text-white hover:bg-white/20 p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 relative flex items-center justify-center">
            {currentStory.stories[currentStory.currentStoryIndex].type ===
            "image" ? (
              <img
                src={currentStory.stories[currentStory.currentStoryIndex].url}
                alt="story"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                src={currentStory.stories[currentStory.currentStoryIndex].url}
                autoPlay={isPlaying}
                playsInline
                className="max-w-full max-h-full"
              />
            )}

            <button
              onClick={prevStory}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-3 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextStory}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-3 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {currentStory.stories[currentStory.currentStoryIndex].type ===
              "video" && (
              <button
                onClick={togglePlayPause}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {showAddStoryModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Create story
                </h2>
                <button
                  onClick={() => setShowAddStoryModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedMedia ? (
                <div className="mb-6">
                  <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                    {mediaType === "image" ? (
                      <img
                        src={selectedMedia.url}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={selectedMedia.url}
                        controls
                        className="w-full h-full object-contain bg-black"
                      />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedMedia(null)}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Change
                    </button>
                    <button
                      onClick={uploadStory}
                      disabled={isUploading}
                      className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? "Uploading..." : "Share to Story"}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-1">
                    Select photos or videos
                  </p>
                  <p className="text-gray-500 text-sm">
                    Photos and videos will be added to your story
                  </p>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*"
                className="hidden"
              />

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your recent stories
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {stories
                    .filter((user) => user.id === 0)
                    .map((user) =>
                      user.stories.map((story) => (
                        <div
                          key={story.id}
                          className="aspect-square rounded-lg overflow-hidden"
                        >
                          <img
                            src={story.url}
                            alt="story"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

 <style> {` .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } .hide-scrollbar::-webkit-scrollbar { display: none; } `} </style>
    </div>
  );
}
