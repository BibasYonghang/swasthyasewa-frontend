import React, { useState } from "react";
import {
  ClipboardCheck,
  Heart,
  Brain,
  Moon,
  Utensils,
  Activity,
  Clock,
  Award,
  CheckCircle,
  PlayCircle,
} from "lucide-react";

export default function HealthTests() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const testCategories = [
    {
      id: "all",
      label: "All Tests",
      icon: <ClipboardCheck size={20} />,
      count: 12,
    },
    { id: "fitness", label: "Fitness", icon: <Activity size={20} />, count: 4 },
    {
      id: "mental",
      label: "Mental Health",
      icon: <Brain size={20} />,
      count: 3,
    },
    { id: "sleep", label: "Sleep Quality", icon: <Moon size={20} />, count: 2 },
    {
      id: "nutrition",
      label: "Nutrition",
      icon: <Utensils size={20} />,
      count: 2,
    },
    {
      id: "cardio",
      label: "Cardiovascular",
      icon: <Heart size={20} />,
      count: 1,
    },
  ];

  const healthTests = [
    {
      id: 1,
      title: "Complete Health Assessment",
      category: "fitness",
      description:
        "Comprehensive evaluation of your overall health and fitness levels",
      duration: "15-20 mins",
      completed: true,
      score: 85,
      icon: <ClipboardCheck className="text-blue-600" size={24} />,
    },
    {
      id: 2,
      title: "Stress Level Analysis",
      category: "mental",
      description:
        "Evaluate your stress levels and get personalized coping strategies",
      duration: "10 mins",
      completed: true,
      score: 72,
      icon: <Brain className="text-purple-600" size={24} />,
    },
    {
      id: 3,
      title: "Sleep Quality Test",
      category: "sleep",
      description:
        "Assess your sleep patterns and get recommendations for better rest",
      duration: "5 mins",
      completed: false,
      icon: <Moon className="text-indigo-600" size={24} />,
    },
    {
      id: 4,
      title: "Nutritional Health Check",
      category: "nutrition",
      description: "Analyze your eating habits and nutritional balance",
      duration: "12 mins",
      completed: false,
      icon: <Utensils className="text-green-600" size={24} />,
    },
    {
      id: 5,
      title: "Cardiovascular Fitness",
      category: "cardio",
      description: "Evaluate heart health and cardiovascular endurance",
      duration: "8 mins",
      completed: true,
      score: 90,
      icon: <Heart className="text-red-600" size={24} />,
    },
    {
      id: 6,
      title: "Daily Activity Assessment",
      category: "fitness",
      description: "Track and analyze your daily physical activity levels",
      duration: "7 mins",
      completed: false,
      icon: <Activity className="text-orange-600" size={24} />,
    },
  ];

  const filteredTests =
    selectedCategory === "all"
      ? healthTests
      : healthTests.filter((test) => test.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Health Tests
        </h1>
        <p className="text-gray-600 mt-2">
          Complete health assessments to track your wellness journey
        </p>
      </div>

      {/* Categories */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {testCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-indigo-700 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-gray-50">{test.icon}</div>
              {test.completed && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-md">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Completed
                  </span>
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {test.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{test.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{test.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award size={16} />
                <span>Health Points: {test.completed ? "50" : "0/50"}</span>
              </div>
            </div>

            {test.completed ? (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Your Score</span>
                    <span className="font-bold text-gray-900">
                      {test.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${test.score}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    View Report
                  </button>
                  <button className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                    Retake Test
                  </button>
                </div>
              </div>
            ) : (
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <PlayCircle size={20} />
                Start Test
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Recommended Section */}
      <div className="mt-8 bg-linear-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Need a Comprehensive Checkup?
            </h2>
            <p className="text-gray-600 mt-2">
              Take our full health assessment for personalized insights
            </p>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
            Start Full Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
