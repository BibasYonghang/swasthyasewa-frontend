// src/Components/Home/NearbyHelpers.jsx
import React from "react";
import { MapPin, User, Star } from "lucide-react";

const helpers = [
  {
    id: 1,
    name: "Raj Kumar",
    skill: "Electrician",
    distance: "0.8 km away",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Anita Sharma",
    skill: "Nurse",
    distance: "1.2 km away",
    rating: 4.9,
  },
];

export default function NearbyHelpers() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-3">Nearby Helpers</h2>

      <div className="space-y-4">
        {helpers.map((helper) => (
          <div
            key={helper.id}
            className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                <User />
              </div>

              <div>
                <p className="font-semibold">{helper.name}</p>
                <p className="text-sm text-gray-700">{helper.skill}</p>
                <div className="flex items-center gap-1 mt-1 text-green-800">
                  <MapPin size={14} /> <span>{helper.distance}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-yellow-600">
              <Star size={18} /> {helper.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
