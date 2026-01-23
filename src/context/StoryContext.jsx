import { useState, useEffect } from "react";
import { EXPIRY_TIME } from "./constants";
import { StoryContext } from "./StoryContextCreate";

export function StoryProvider({ children }) {
  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem("stories");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStories((prev) => {
        const filtered = prev.filter((user) =>
          user.stories.some(
            (story) => Date.now() - story.createdAt < EXPIRY_TIME,
          ),
        );
        localStorage.setItem("stories", JSON.stringify(filtered));
        return filtered;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const addStory = (newStory) => {
    console.log("=== addStory called ===");
    console.log("newStory object:", newStory);
    console.log("newStory.user:", newStory.user);
    console.log("newStory.user._id:", newStory.user._id);
    console.log("newStory.user.username:", newStory.user.username);
    console.log("newStory.user.userImage:", newStory.user.userImage);

    setStories((prev) => {
      const userId = newStory.user._id;
      console.log("userId extracted:", userId);

      const existingUserIndex = prev.findIndex((u) => u._id === userId);

      let updated;

      if (existingUserIndex !== -1) {
        // Append story to existing user
        updated = prev.map((u, index) =>
          index === existingUserIndex
            ? { ...u, stories: [...newStory.stories, ...u.stories] }
            : u,
        );
      } else {
        // Create new user story group - ensure _id is always set
        const userObject = {
          _id: newStory.user._id,
          username: newStory.user.username,
          userImage: newStory.user.userImage,
          stories: newStory.stories,
        };
        console.log("Creating new user story group:", userObject);
        updated = [userObject, ...prev];
      }

      console.log("Updated stories:", updated);
      localStorage.setItem("stories", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <StoryContext.Provider value={{ stories, addStory }}>
      {children}
    </StoryContext.Provider>
  );
}
