import React, { useState } from "react";
import {
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  Edit3,
  Trash2,
  Share2,
  Bell,
  Award,
  BarChart3,
  Users,
} from "lucide-react";

export default function PersonalPlans() {
  const [activeTab, setActiveTab] = useState("active");

  const plans = [
    {
      id: 1,
      title: "Weight Management Plan",
      category: "fitness",
      progress: 75,
      duration: "12 weeks",
      startDate: "2024-01-01",
      endDate: "2024-03-24",
      completedTasks: 15,
      totalTasks: 20,
      status: "active",
      coach: "Dr. Robert Wilson",
      color: "bg-green-500",
    },
    {
      id: 2,
      title: "Stress Reduction Program",
      category: "mental",
      progress: 40,
      duration: "8 weeks",
      startDate: "2024-01-10",
      endDate: "2024-03-03",
      completedTasks: 8,
      totalTasks: 20,
      status: "active",
      coach: "Dr. Emily Brown",
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Sleep Optimization",
      category: "sleep",
      progress: 100,
      duration: "4 weeks",
      startDate: "2023-12-01",
      endDate: "2023-12-29",
      completedTasks: 16,
      totalTasks: 16,
      status: "completed",
      coach: "Dr. Amanda Lee",
      color: "bg-indigo-500",
    },
    {
      id: 4,
      title: "Nutrition Plan",
      category: "nutrition",
      progress: 25,
      duration: "6 weeks",
      startDate: "2024-01-15",
      endDate: "2024-02-26",
      completedTasks: 5,
      totalTasks: 20,
      status: "active",
      coach: "Dr. Sarah Johnson",
      color: "bg-blue-500",
    },
    {
      id: 5,
      title: "Cardio Fitness Boost",
      category: "fitness",
      progress: 0,
      duration: "10 weeks",
      startDate: "2024-02-01",
      endDate: "2024-04-11",
      completedTasks: 0,
      totalTasks: 25,
      status: "upcoming",
      coach: "Dr. Michael Chen",
      color: "bg-red-500",
    },
  ];

  const weeklyTasks = [
    { id: 1, title: "30-min morning workout", day: "Mon", completed: true },
    { id: 2, title: "Drink 2L water", day: "Mon", completed: true },
    { id: 3, title: "Meditation session", day: "Tue", completed: false },
    { id: 4, title: "High-protein lunch", day: "Tue", completed: true },
    { id: 5, title: "Evening walk", day: "Wed", completed: false },
    { id: 6, title: "Sleep by 11 PM", day: "Wed", completed: false },
    { id: 7, title: "Weekly weigh-in", day: "Thu", completed: true },
  ];

  const filteredPlans =
    activeTab === "all"
      ? plans
      : plans.filter((plan) => plan.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {["active", "upcoming", "completed", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm hover:cursor-pointer font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab} (
              {tab === "all"
                ? plans.length
                : plans.filter((p) => p.status === tab).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`p-4 ${plan.color} bg-opacity-10`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white ${plan.color}`}
                  >
                    {plan.category.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Edit3 size={16} />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{plan.title}</h3>
              <p className="text-sm text-gray-600 mt-1">Coach: {plan.coach}</p>
            </div>

            {/* Progress */}
            <div className="p-4">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Progress</span>
                  <span className="font-bold text-gray-900">
                    {plan.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${plan.color}`}
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">{plan.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tasks</p>
                  <p className="font-medium text-gray-900">
                    {plan.completedTasks}/{plan.totalTasks}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium text-gray-900">{plan.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium text-gray-900">{plan.endDate}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-indigo-600 hover:cursor-pointer text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  {plan.status === "completed"
                    ? "Review Plan"
                    : "Continue Plan"}
                </button>
                <button className="px-3 border hover:cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* This Week's Tasks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              This Week's Tasks
            </h2>
            <p className="text-gray-600 mt-1">
              Stay on track with your daily activities
            </p>
          </div>
          <button className="flex items-center gap-2 text-indigo-600 font-medium">
            <Bell size={18} />
            Set Reminders
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
            const dayTasks = weeklyTasks.filter((task) => task.day === day);
            return (
              <div key={day} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 text-center mb-3">
                  {day}
                </h3>
                <div className="space-y-2">
                  {dayTasks.length > 0 ? (
                    dayTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-2 rounded text-sm ${
                          task.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-white border"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {task.completed ? (
                            <CheckCircle size={14} className="text-green-600" />
                          ) : (
                            <Clock size={14} className="text-gray-400" />
                          )}
                          <span
                            className={task.completed ? "line-through" : ""}
                          >
                            {task.title}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm text-center">
                      No tasks
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-600" size={24} />
            <h3 className="text-lg font-bold text-gray-900">
              Recent Achievements
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-lg">
              <Award size={16} className="text-yellow-600" />
              <span className="text-sm font-medium">
                Consistency Streak - 7 days
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
              <Target size={16} className="text-green-600" />
              <span className="text-sm font-medium">
                Weight Loss Goal - 5kg
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
              <Users size={16} className="text-blue-600" />
              <span className="text-sm font-medium">Community Top 10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
