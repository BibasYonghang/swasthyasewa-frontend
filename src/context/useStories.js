import { useContext } from "react";
import { StoryContext } from "./StoryContextCreate";

export const useStories = () => useContext(StoryContext);
