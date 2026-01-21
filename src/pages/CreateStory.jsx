import React, { useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateStory() {
  const fileInputRef = useRef(null);

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // TEXT STORY
  const [textStory, setTextStory] = useState("");
  const [isTextUploading, setIsTextUploading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedMedia({
        file,
        url: reader.result,
      });
      setMediaType(file.type.startsWith("video") ? "video" : "image");
    };
    reader.readAsDataURL(file);
  };

  const uploadStory = async () => {
    if (!selectedMedia) return;
    setIsUploading(true);

    await new Promise((r) => setTimeout(r, 1000));

    setSelectedMedia(null);
    setIsUploading(false);
  };

  const uploadTextStory = async () => {
    if (!textStory.trim()) return;
    setIsTextUploading(true);

    await new Promise((r) => setTimeout(r, 1000));

    setTextStory("");
    setIsTextUploading(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
          {/* HEADER */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Create story</h2>
            <Link
              to="/home"
              className="hover:cursor-pointer hover:bg-gray-100 rounded-full p-2"
            >
              <X />
            </Link>
          </div>

          <div className="p-6">
            {/* MEDIA STORY */}
            {selectedMedia ? (
              <div className="mb-6">
                <div className="h-64 rounded-lg overflow-hidden mb-4">
                  {mediaType === "image" ? (
                    <img
                      src={selectedMedia.url}
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
                    className="flex-1 border py-2 rounded-lg"
                  >
                    Change
                  </button>
                  <button
                    onClick={uploadStory}
                    disabled={isUploading}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                  >
                    {isUploading ? "Uploading..." : "Share"}
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed p-8 rounded-lg text-center cursor-pointer"
              >
                <Camera className="mx-auto mb-3 text-gray-400" />
                <p>Select photos or videos</p>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,video/*"
              className="hidden"
            />

            {/* TEXT STORY */}
            <div className="mt-6">
              {textStory ? (
                <div>
                  <div className="h-64 mb-4 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
                    <p className="text-white text-xl font-semibold text-center">
                      {textStory}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setTextStory("")}
                      className="flex-1 border py-2 rounded-lg"
                    >
                      Change
                    </button>
                    <button
                      onClick={uploadTextStory}
                      disabled={isTextUploading}
                      className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                    >
                      {isTextUploading ? "Uploading..." : "Share"}
                    </button>
                  </div>
                </div>
              ) : (
                <textarea
                  value={textStory}
                  onChange={(e) => setTextStory(e.target.value)}
                  placeholder="Write a text story..."
                  className="w-full h-32 border rounded-lg p-3"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
