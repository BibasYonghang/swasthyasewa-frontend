import React from "react";

export default function Saved() {
  const savedPost = [
    { title: "help post", category: "post" },
    { title: "Information Reels", category: "reels" },
  ];
  return (
    <>
      <h1>All</h1>
      <div className="h-[10vh] text-black w-full bg-gray-200">
        {savedPost.map(({ title, category }, idx) => {
          return (
            <div key={idx} className="">
              <h1>{title}</h1>
              <p>{category}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
