import { BarChart3, CheckCircle, Plus, Target, TrendingUp } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

export default function PersonalPlansLayout() {
  return (
    <>
      <div className=" bg-gray-50 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Personal Health Plans
            </h1>
            <p className="text-gray-600 mt-2">
              Your customized health and wellness programs
            </p>
          </div>
          <button className="bg-indigo-600 hover:cursor-pointer text-white px-5 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 whitespace-nowrap">
            <Plus size={20} />
            Create New Plan
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Plans</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Target className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">68%</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">44</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Avg. Progress</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">56%</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <BarChart3 className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
