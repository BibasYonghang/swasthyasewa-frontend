// src/components/ReactionPopup.jsx
import React from "react";
import { REACTIONS } from "../reactions";

export default function ReactionPopup({ postId, setReactingPost, updatePost }) {
  return (
    <div className="absolute bottom-10 flex bg-white shadow-lg rounded-full p-1 gap-1">
      {REACTIONS.map((r) => (
        <div
          key={r.id}
          onClick={() => {
            updatePost(postId, r.id);
            setReactingPost(false);
          }}
          className="cursor-pointer text-xl hover:scale-125 transition-transform"
        >
          {r.emoji}
        </div>
      ))}
    </div>
  );
}
