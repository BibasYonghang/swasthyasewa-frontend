export const REACTIONS = [
    { id: "like", emoji: "👍", label: "Like", color: "text-blue-600" },
    { id: "love", emoji: "❤️", label: "Love", color: "text-red-500" },
    { id: "haha", emoji: "😆", label: "Haha", color: "text-yellow-400" },
    { id: "wow", emoji: "😮", label: "Wow", color: "text-yellow-400" },
    { id: "sad", emoji: "😢", label: "Sad", color: "text-yellow-600" },
    { id: "angry", emoji: "😡", label: "Angry", color: "text-red-700" },
  ];
  
  // Utility function to find reaction object by ID
  export function getReactionObj(reactionId) {
    return REACTIONS.find((reaction) => reaction.id === reactionId) || null;
  }
  