import React from "react";

export default function PromoBanner() {
  return (
    <div className="mt-8 bg-linear-to-r from-green-50 to-emerald-100 rounded-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Get 20% Off Your First Annual Plan</h3>
          <p className="text-gray-600 mt-2">Use code: HEALTH2024</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap">
          Apply Code
        </button>
      </div>
    </div>
  );
}
