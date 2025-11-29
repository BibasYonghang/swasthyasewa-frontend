import React from "react";
import { REACTIONS } from "../reactions";

export default function ReactionPopup({ handleReaction }) {
  const handleClick = (reactionType, e) => {
    e.stopPropagation(); // Prevent bubbling
    handleReaction(reactionType); // Trigger reaction in PostCard
  };

  return (
    <div 
      className="absolute bottom-10 flex bg-white shadow-lg rounded-full p-1 gap-1 z-50 border border-gray-200"
      onClick={(e) => e.stopPropagation()} // Prevent popup click from closing
    >
      {REACTIONS.map((r) => (
        <button
          key={r.id}
          onClick={(e) => handleClick(r.id, e)}
          className="cursor-pointer text-xl hover:scale-125 transition-transform transform hover:-translate-y-1 duration-200 focus:outline-none"
          title={r.label}
          type="button"
        >
          {r.emoji}
        </button>
      ))}
    </div>
  );
}
