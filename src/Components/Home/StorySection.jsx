import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Camera,
  X,
  Play,
  Pause,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

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
    ],
    createdAt: "2 hours ago",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function StorySection() {
  const [stories, setStories] = useState(initialStories);
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

  /* ---------------- STORY NAVIGATION ---------------- */

  const nextStory = useCallback(() => {
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
      setShowStoryViewer(false);
      setCurrentStory(null);
    }
  }, [currentStory]);

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
    }
  }, [currentStory]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);

    const videoEl = videoRef.current;
    if (
      videoEl &&
      currentStory?.stories[currentStory.currentStoryIndex].type === "video"
    ) {
      isPlaying ? videoEl.pause() : videoEl.play();
    }
  }, [currentStory, isPlaying]);

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    if (!showStoryViewer || !currentStory || !isPlaying) {
      clearInterval(progressInterval.current);
      return;
    }

    const { duration = 5000 } =
      currentStory.stories[currentStory.currentStoryIndex];

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

    return () => clearInterval(progressInterval.current);
  }, [showStoryViewer, currentStory, isPlaying, nextStory]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (
      currentStory?.stories[currentStory.currentStoryIndex].type === "video" &&
      videoEl
    ) {
      const handleEnd = () => nextStory();
      videoEl.addEventListener("ended", handleEnd);
      return () => videoEl.removeEventListener("ended", handleEnd);
    }
  }, [currentStory, nextStory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showStoryViewer) return;
      if (e.key === "ArrowRight") nextStory();
      if (e.key === "ArrowLeft") prevStory();
      if (e.key === " ") togglePlayPause();
      if (e.key === "Escape") setShowStoryViewer(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showStoryViewer, nextStory, prevStory, togglePlayPause]);

  /* ---------------- HANDLERS ---------------- */

  const viewStory = (user) => {
    setCurrentStory({
      user,
      stories: user.stories,
      currentStoryIndex: 0,
    });
    setShowStoryViewer(true);
    setProgress(0);
    setIsPlaying(true);
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

    setStories((prev) => [
      { id: 0, username: "You", userImage: "", stories: [newStory] },
      ...prev,
    ]);

    setShowAddStoryModal(false);
    setSelectedMedia(null);
    setIsUploading(false);
  };

  /* ---------------- JSX ---------------- */

  return (
    <div className="mb-4">
      <div className="flex gap-3">
        <div onClick={() => setShowAddStoryModal(true)}>➕ Add Story</div>

        {stories.map((user) => (
          <div key={user.id} onClick={() => viewStory(user)}>
            {user.username}
          </div>
        ))}
      </div>

      {showStoryViewer && currentStory && (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          {currentStory.stories[currentStory.currentStoryIndex].type ===
          "image" ? (
            <img
              src={currentStory.stories[currentStory.currentStoryIndex].url}
              alt="story"
            />
          ) : (
            <video
              ref={videoRef}
              src={currentStory.stories[currentStory.currentStoryIndex].url}
              autoPlay
            />
          )}

          <button onClick={prevStory}>
            <ChevronLeft />
          </button>
          <button onClick={nextStory}>
            <ChevronRight />
          </button>
          <button onClick={togglePlayPause}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={() => setShowStoryViewer(false)}>
            <X />
          </button>
        </div>
      )}

      {showAddStoryModal && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            hidden
          />
          <button onClick={() => fileInputRef.current.click()}>
            <Camera /> Select
          </button>
          <button onClick={uploadStory} disabled={isUploading}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
}
