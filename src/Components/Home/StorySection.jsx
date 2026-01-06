import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Camera,
  X,
  Play,
  Pause,
} from "lucide-react";

// Mock user data - in real app this would come from your backend
const initialStories = [
  {
    id: 1,
    username: "John Doe",
    userImage: "https://randomuser.me/api/portraits/men/1.jpg",
    stories: [
      {
        id: 101,
        type: "image",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        viewed: false,
        duration: 5000,
      },
      {
        id: 102,
        type: "image",
        url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w-400",
        viewed: false,
        duration: 5000,
      },
    ],
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    username: "Jane Smith",
    userImage: "https://randomuser.me/api/portraits/women/2.jpg",
    stories: [
      {
        id: 201,
        type: "video",
        url: "https://assets.mixkit.co/videos/preview/mixkit-woman-training-in-the-gym-41537-large.mp4",
        viewed: true,
        duration: 8000,
      },
    ],
    createdAt: "4 hours ago",
  },
  {
    id: 3,
    username: "Alex Johnson",
    userImage: "https://randomuser.me/api/portraits/men/3.jpg",
    stories: [
      {
        id: 301,
        type: "image",
        url: "https://images.unsplash.com/photo-1549060279-7e168fce7090?w=400",
        viewed: false,
        duration: 5000,
      },
    ],
    createdAt: "6 hours ago",
  },
  {
    id: 4,
    username: "Sarah Wilson",
    userImage: "https://randomuser.me/api/portraits/women/4.jpg",
    stories: [
      {
        id: 401,
        type: "image",
        url: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400",
        viewed: false,
        duration: 5000,
      },
    ],
    createdAt: "1 day ago",
  },
  {
    id: 5,
    username: "Mike Brown",
    userImage: "https://randomuser.me/api/portraits/men/5.jpg",
    stories: [
      {
        id: 501,
        type: "image",
        url: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400",
        viewed: true,
        duration: 5000,
      },
    ],
    createdAt: "2 days ago",
  },
];

const YOUR_USER_ID = "current-user"; // This would come from auth context

export default function StorySection() {
  const [stories, setStories] = useState(initialStories);
  const [currentUserStories, setCurrentUserStories] = useState([]);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const progressInterval = useRef(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const storyContainerRef = useRef(null);

  // Check if current user already has a story
  useEffect(() => {
    const userStory = stories.find((story) => story.id === 0); // Assuming ID 0 is current user
    if (userStory) {
      setCurrentUserStories(userStory.stories);
    }
  }, [stories]);

  const handleScroll = (direction) => {
    if (storyContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      storyContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const viewStory = (storyUser, storyIndex = 0) => {
    setCurrentStory({
      user: storyUser,
      currentStoryIndex: storyIndex,
      stories: storyUser.stories,
    });
    setShowStoryViewer(true);
    setProgress(0);
    setIsPlaying(true);

    // Mark as viewed
    if (!storyUser.stories[storyIndex].viewed) {
      setStories((prev) =>
        prev.map((user) =>
          user.id === storyUser.id
            ? {
                ...user,
                stories: user.stories.map((s, idx) =>
                  idx === storyIndex ? { ...s, viewed: true } : s
                ),
              }
            : user
        )
      );
    }
  };

  const handleAddStoryClick = () => {
    setShowAddStoryModal(true);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target.result;
      const type = file.type.startsWith("video/") ? "video" : "image";

      setSelectedMedia({
        file,
        url,
        type,
      });
      setMediaType(type);
    };
    reader.readAsDataURL(file);
  };

  const uploadStory = async () => {
    if (!selectedMedia) return;

    setIsUploading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newStory = {
        id: Date.now(),
        type: mediaType,
        url: selectedMedia.url,
        viewed: false,
        duration: mediaType === "video" ? 8000 : 5000,
      };

      // Check if current user already has a story entry
      const existingUserIndex = stories.findIndex((s) => s.id === 0);

      if (existingUserIndex >= 0) {
        // Add to existing stories
        const updatedStories = [...stories];
        updatedStories[existingUserIndex].stories = [
          newStory,
          ...updatedStories[existingUserIndex].stories,
        ];
        setStories(updatedStories);
      } else {
        // Create new user story entry
        const currentUserStory = {
          id: 0,
          username: "You",
          userImage: "https://randomuser.me/api/portraits/men/0.jpg", // Your profile image
          stories: [newStory],
          createdAt: "Just now",
        };
        setStories([currentUserStory, ...stories]);
      }

      setCurrentUserStories((prev) => [newStory, ...prev]);
      setShowAddStoryModal(false);
      setSelectedMedia(null);
    } catch (error) {
      console.error("Error uploading story:", error);
      alert("Failed to upload story. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const nextStory = () => {
    if (!currentStory) return;

    const nextIndex = currentStory.currentStoryIndex + 1;

    if (nextIndex < currentStory.stories.length) {
      setCurrentStory((prev) => ({
        ...prev,
        currentStoryIndex: nextIndex,
      }));
      setProgress(0);
      setIsPlaying(true);
    } else {
      // Move to next user
      const currentUserIndex = stories.findIndex(
        (u) => u.id === currentStory.user.id
      );
      const nextUser = stories[currentUserIndex + 1];

      if (nextUser && nextUser.stories.length > 0) {
        setCurrentStory({
          user: nextUser,
          currentStoryIndex: 0,
          stories: nextUser.stories,
        });
        setProgress(0);
        setIsPlaying(true);
      } else {
        // No more stories, close viewer
        setShowStoryViewer(false);
        setCurrentStory(null);
      }
    }
  };

  const prevStory = () => {
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
      // Move to previous user
      const currentUserIndex = stories.findIndex(
        (u) => u.id === currentStory.user.id
      );
      const prevUser = stories[currentUserIndex - 1];

      if (prevUser && prevUser.stories.length > 0) {
        setCurrentStory({
          user: prevUser,
          currentStoryIndex: prevUser.stories.length - 1,
          stories: prevUser.stories,
        });
        setProgress(0);
        setIsPlaying(true);
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (
      currentStory?.stories[currentStory.currentStoryIndex].type === "video" &&
      videoRef.current
    ) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // Progress bar animation
  useEffect(() => {
    if (!showStoryViewer || !currentStory || !isPlaying) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    const currentStoryData =
      currentStory.stories[currentStory.currentStoryIndex];
    const duration = currentStoryData?.duration || 5000;

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval.current);
          nextStory();
          return 0;
        }
        return prev + 100 / (duration / 100);
      });
    }, 100);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [
    showStoryViewer,
    currentStory,
    currentStory?.currentStoryIndex,
    isPlaying,
  ]);

  // Handle video ended event
  useEffect(() => {
    if (
      currentStory?.stories[currentStory.currentStoryIndex].type === "video" &&
      videoRef.current
    ) {
      const handleVideoEnd = () => {
        nextStory();
      };

      videoRef.current.addEventListener("ended", handleVideoEnd);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("ended", handleVideoEnd);
        }
      };
    }
  }, [currentStory?.currentStoryIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showStoryViewer) return;

      switch (e.key) {
        case "ArrowRight":
          nextStory();
          break;
        case "ArrowLeft":
          prevStory();
          break;
        case "Escape":
          setShowStoryViewer(false);
          break;
        case " ":
          togglePlayPause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showStoryViewer, currentStory, isPlaying]);

  const handleStoryClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width / 3) {
      prevStory();
    } else if (clickX > (2 * width) / 3) {
      nextStory();
    } else {
      togglePlayPause();
    }
  };

  return (
    <div className=" rounded-xl shadow-sm borde mb-4">
      {/* Stories Container */}
      <div className="relative">
        <div
          ref={storyContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Add Story Card - Always First */}
          <div className="flex-shrink-0 w-28 md:w-32 lg:w-36">
            <div className="relative h-full">
              <div
                className="relative bg-gradient-to-br h-full  from-blue-100 to-purple-100 rounded-xl p-0.5 cursor-pointer group"
                onClick={handleAddStoryClick}
              >
                <div className="bg-white rounded-[10px] overflow-hidden h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-2 group-hover:bg-blue-600 transition-colors">
                    <Plus size={28} className="text-white" />
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">
                    Create Story
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Share a moment</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Stories */}
          {stories.map((user) => (
            <div
              key={user.id}
              className="flex-shrink-0 w-28 md:w-32 lg:w-36 cursor-pointer"
              onClick={() => viewStory(user)}
            >
              <div className="relative">
                {/* Story Border - Gradient if unviewed */}
                <div
                  className={`relative rounded-xl p-0.5 ${
                    user.stories.some((s) => !s.viewed)
                      ? "bg-gradient-to-br from-blue-500 to-purple-500"
                      : "bg-gradient-to-br from-gray-300 to-gray-400"
                  }`}
                >
                  <div className="bg-white rounded-[10px] overflow-hidden">
                    {/* Story Image */}
                    <div className="h-32 md:h-36 lg:h-40 overflow-hidden">
                      <img
                        src={user.stories[0].url}
                        alt={user.username}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* User Info */}
                    <div className="p-2">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={user.userImage}
                            alt={user.username}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                          {user.id === 0 && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border border-white flex items-center justify-center">
                              <Plus size={10} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div className="ml-2">
                          <p className="font-semibold text-xs text-gray-800 truncate">
                            {user.id === 0 ? "Your Story" : user.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.id === 0
                              ? "Add to your story"
                              : user.createdAt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unviewed Stories Indicator */}
                {user.stories.some((s) => !s.viewed) && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {showStoryViewer && currentStory && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Progress Bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
            {currentStory.stories.map((story, index) => (
              <div
                key={story.id}
                className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full ${
                    index === currentStory.currentStoryIndex
                      ? "bg-white"
                      : "bg-gray-400"
                  } transition-all duration-100`}
                  style={{
                    width:
                      index === currentStory.currentStoryIndex
                        ? `${progress}%`
                        : index < currentStory.currentStoryIndex
                        ? "100%"
                        : "0%",
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* Story Content */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={handleStoryClick}
          >
            {currentStory.stories[currentStory.currentStoryIndex].type ===
            "image" ? (
              <img
                src={currentStory.stories[currentStory.currentStoryIndex].url}
                alt="Story"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                src={currentStory.stories[currentStory.currentStoryIndex].url}
                className="max-w-full max-h-full"
                autoPlay={isPlaying}
                controls={false}
                playsInline
              />
            )}
          </div>

          {/* User Info */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex items-center bg-black bg-opacity-50 backdrop-blur-sm rounded-full px-4 py-2">
              <img
                src={currentStory.user.userImage}
                alt={currentStory.user.username}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <p className="text-white font-semibold">
                  {currentStory.user.username}
                </p>
                <p className="text-gray-300 text-xs">
                  {currentStory.user.createdAt}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <button
              onClick={togglePlayPause}
              className="p-3 rounded-full bg-black bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 transition-colors"
            >
              {isPlaying ? (
                <Pause size={24} className="text-white" />
              ) : (
                <Play size={24} className="text-white" />
              )}
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevStory}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 transition-colors z-10"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button
            onClick={nextStory}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 transition-colors z-10"
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          {/* Close Button */}
          <button
            onClick={() => setShowStoryViewer(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-black bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70 transition-colors z-10"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
      )}

      {/* Add Story Modal */}
      {showAddStoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Create Story
                </h3>
                <button
                  onClick={() => {
                    setShowAddStoryModal(false);
                    setSelectedMedia(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-4">
              {!selectedMedia ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Camera size={32} className="text-blue-500" />
                  </div>
                  <p className="text-gray-700 mb-4">
                    Select a photo or video to share
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Select Media
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
                    {mediaType === "image" ? (
                      <img
                        src={selectedMedia.url}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <video
                        src={selectedMedia.url}
                        className="w-full h-64 object-cover"
                        controls
                      />
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedMedia(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={uploadStory}
                      disabled={isUploading}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Uploading...</span>
                        </div>
                      ) : (
                        "Share to Story"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*,video/*"
        className="hidden"
      />

      {/* Custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
