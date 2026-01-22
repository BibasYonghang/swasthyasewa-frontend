import { createContext, useContext, useState, useEffect } from "react";

const StoryContext = createContext();

const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours

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
    setStories((prev) => {
      const updated = [newStory, ...prev];
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

export const useStories = () => useContext(StoryContext);
