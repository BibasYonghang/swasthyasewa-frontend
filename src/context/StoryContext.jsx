import { useState, useEffect } from "react";
import { EXPIRY_TIME } from "./constants";
import { StoryContext } from "./StoryContextCreate";

export function StoryProvider({ children }) {
  const [stories, setStories] = useState(
    //lazy initialization
    () => {
      const saved = localStorage.getItem("stories");
      return saved ? JSON.parse(saved) : [];
    },
  );

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
    setStories((prev) => {
      const userId = newStory.user._id;

      const existingUserIndex = prev.findIndex((u) => u._id === userId);

      let updated;

      if (existingUserIndex !== -1) {
        // Append to existing user
        updated = prev.map((u, index) =>
          index === existingUserIndex
            ? {
                ...u,
                stories: Array.isArray(newStory.stories)
                  ? [...newStory.stories, ...u.stories]
                  : [newStory.stories, ...u.stories],
              }
            : u,
        );
      } else {
        // Create new user story group
        updated = [
          {
            _id: newStory.user._id,
            username: newStory.user.username,
            userImage: newStory.user.userImage,
            stories: Array.isArray(newStory.stories)
              ? newStory.stories
              : [newStory.stories],
          },
          ...prev,
        ];
      }

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
