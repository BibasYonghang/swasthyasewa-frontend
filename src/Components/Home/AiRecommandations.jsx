// src/Components/Home/AiRecommandations.jsx
import React from "react";
import { Brain, Sparkles } from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "You may need an electrician",
    desc: "We noticed several nearby users are reporting electrical issues. Want help?",
  },
  {
    id: 2,
    title: "Study boost suggestion",
    desc: "Based on your activity, you might benefit from a 20-minute focused study sprint.",
  },
];

export default function AiRecommandations() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Brain size={22} /> AI Recommendations
      </h2>

      <div className="space-y-4 mt-4">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-purple-50 border border-purple-200 rounded-xl"
          >
            <div className="flex items-center gap-2 font-medium text-purple-700">
              <Sparkles size={18} /> {item.title}
            </div>
            <p className="text-sm mt-1 text-purple-800">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
