import React from "react";
import { REACTIONS } from "../reactions.js";

export default function ReactionPopup({ postId, setReactingPost, updatePost }) {
  return (
    <div
      className="absolute z-50 -top-12 left-1/2 -translate-x-1/2 bg-white border shadow-xl px-2 py-1 rounded-full flex gap-2 items-center"
      onMouseEnter={() => setReactingPost(true)}
      onMouseLeave={() => setReactingPost(false)}
    >
      {REACTIONS.map(({ id, emoji }) => (
        <span
          key={id}
          className="text-2xl mx-0.5 hover:scale-125 cursor-pointer transition-transform select-none"
          onClick={() => updatePost(postId, id)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}
