import { REACTIONS } from "../Components/reactions.js";

// Utility function to find reaction object by ID
export function getReactionObj(reactionId) {
  return REACTIONS.find((reaction) => reaction.id === reactionId) || null;
}
