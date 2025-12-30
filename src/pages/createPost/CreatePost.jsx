import React, { useState, useRef } from "react";
import { Image, MapPin, Send, Smile, X, Loader } from "lucide-react";
import { createNewPost } from "../../config/api/posts.js";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [showFeelingModal, setShowFeelingModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const feelings = [
    { emoji: "💪", label: "Exercised" },
    { emoji: "🛌", label: "Slept Well" },
    { emoji: "🤒", label: "Feeling Unwell" },
    { emoji: "🩺", label: "Doctor Visit" },
    { emoji: "🥗", label: "Healthy Meal" },
    { emoji: "💊", label: "Took Medication" },
    { emoji: "🧘", label: "Meditation / Yoga" },
    { emoji: "🏃", label: "Running / Walking" },
    { emoji: "🚴", label: "Cycling" },
    { emoji: "🧴", label: "Self Care" },
  ];

  const popularLocations = [
    "Home",
    "Gym",
    "Clinic",
    "Hospital",
    "Pharmacy",
    "Yoga Studio",
    "Park",
    "Lab",
    "Office",
  ];

  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedImages.length > 4) {
      alert("You can only upload up to 4 images");
      return;
    }

    setImageUploading(true);

    setTimeout(() => {
      const newImages = files.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        url: URL.createObjectURL(file),
      }));

      setSelectedImages((prev) => [...prev, ...newImages]);
      setImageUploading(false);
    }, 500);
  };

  const removeImage = (id) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleFeelingSelect = (feeling) => {
    setSelectedFeeling(`${feeling.emoji} Feeling ${feeling.label}`);
    setShowFeelingModal(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationModal(false);
  };

  const handleCustomLocation = () => {
    const location = prompt("Enter your location:");
    if (location) setSelectedLocation(location);
    setShowLocationModal(false);
  };

  const clearFeeling = () => setSelectedFeeling("");
  const clearLocation = () => setSelectedLocation("");

  const handleSubmit = async () => {
    if (!postText.trim() && selectedImages.length === 0) return;

    try {
      setLoading(true);

      const authToken = localStorage.getItem("token"); // ✅ FIX ADDED HERE

      const formData = new FormData();
      formData.append("content", postText);

      if (selectedFeeling) formData.append("feeling", selectedFeeling);
      if (selectedLocation) formData.append("location", selectedLocation);

      selectedImages.forEach((image) => {
        formData.append("images", image.file);
      });

      await createNewPost(formData, authToken);

      setLoading(false);
      navigate("/home");
    } catch (err) {
      console.error("Error creating post:", err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="w-[90vw] sm:w-[70vw] mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Create Post</h1>
          <p className="text-gray-600 text-sm mt-1">
            Share what's on your mind
          </p>
        </div>

        {/* User info and input area */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <img
              src="/default-user.png"
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            />

            <div className="flex-1">
              <div className="font-semibold text-gray-800">You</div>

              {/* Feeling and Location tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedFeeling && (
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {selectedFeeling}
                    <button
                      onClick={clearFeeling}
                      className="hover:text-blue-900 ml-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {selectedLocation && (
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                    📍 {selectedLocation}
                    <button
                      onClick={clearLocation}
                      className="hover:text-green-900 ml-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Share your health update or question..."
                aria-label="Health Update"
                className="w-full resize-none p-4 rounded-2xl bg-gray-50 outline-none text-gray-800 placeholder-gray-500 border border-gray-200 focus:border-blue-500 transition-colors min-h-[120px]"
                rows={4}
              />
            </div>
          </div>

          {/* Image preview grid */}
          {selectedImages.length > 0 && (
            <div
              className={`mt-4 grid gap-2 ${
                selectedImages.length === 1
                  ? "grid-cols-1"
                  : selectedImages.length === 2
                  ? "grid-cols-2"
                  : selectedImages.length === 3
                  ? "grid-cols-2"
                  : "grid-cols-2"
              }`}
            >
              {selectedImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`relative rounded-xl overflow-hidden ${
                    selectedImages.length === 3 && index === 0
                      ? "col-span-2"
                      : ""
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Uploading indicator */}
          {imageUploading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-blue-600">
              <Loader size={20} className="animate-spin" />
              <span>Uploading images...</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {/* Left side action buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Photo upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center hover:cursor-pointer gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              <Image size={20} className="text-green-500" />
              <span>Photo</span>
              {selectedImages.length > 0 && (
                <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedImages.length}
                </span>
              )}
            </button>

            {/* Location */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex hover:cursor-pointer justify-center items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              <MapPin size={20} className="text-red-500" />
              <span>Location</span>
            </button>

            {/* Feeling */}
            <button
              onClick={() => setShowFeelingModal(true)}
              className="flex hover:cursor-pointer justify-center items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              <Smile size={20} className="text-yellow-500" />
              <span>Feeling</span>
            </button>
            {/* Post button */}
            <button
              onClick={handleSubmit}
              disabled={
                loading || (!postText.trim() && selectedImages.length === 0)
              }
              className={`flex items-center gap-2 justify-center px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                loading || (!postText.trim() && selectedImages.length === 0)
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-blue-600 hover:cursor-pointer to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        multiple
        accept="image/*"
        className="hidden"
      />

      {/* Feeling/Activity Modal */}
      {showFeelingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  How are you feeling?
                </h3>
                <button
                  onClick={() => setShowFeelingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-4 grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
              {feelings.map((feeling, index) => (
                <button
                  key={index}
                  onClick={() => handleFeelingSelect(feeling)}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <span className="text-2xl mb-2">{feeling.emoji}</span>
                  <span className="text-sm text-gray-700">{feeling.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Add Location
                </h3>
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {popularLocations.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3 border border-transparent hover:border-gray-200"
                  >
                    <MapPin size={18} className="text-red-500" />
                    <span className="text-gray-700">{location}</span>
                  </button>
                ))}

                <button
                  onClick={handleCustomLocation}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3 border-2 border-dashed border-gray-300 hover:border-blue-500 mt-4"
                >
                  <MapPin size={18} className="text-blue-500" />
                  <span className="text-blue-600 font-medium">
                    Add custom location
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
