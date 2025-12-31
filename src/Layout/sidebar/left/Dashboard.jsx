import React from 'react';
import { 
  Activity, 
  Heart, 
  Moon, 
  TrendingUp, 
  AlertCircle,
  Dumbbell,
  Droplets,
  Brain
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  // Health metrics data
  const healthMetrics = [
    {
      title: 'Heart Rate',
      value: '72 BPM',
      icon: <Heart className="text-red-500" size={24} />,
      status: 'normal',
      change: '-2%'
    },
    {
      title: 'Sleep Score',
      value: '8.2/10',
      icon: <Moon className="text-indigo-500" size={24} />,
      status: 'good',
      change: '+5%'
    },
    {
      title: 'Daily Steps',
      value: '8,542',
      icon: <Activity className="text-green-500" size={24} />,
      status: 'good',
      change: '+12%'
    },
    {
      title: 'Stress Level',
      value: 'Medium',
      icon: <Brain className="text-orange-500" size={24} />,
      status: 'warning',
      change: '-3%'
    }
  ];

  // Activity chart data
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Minutes',
        data: [45, 60, 30, 75, 50, 90, 65],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4
      }
    ]
  };

  // Health score data
  const healthScoreData = {
    labels: ['Fitness', 'Nutrition', 'Sleep', 'Mental'],
    datasets: [
      {
        data: [85, 70, 90, 65],
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#8B5CF6',
          '#F59E0B'
        ]
      }
    ]
  };

  // Recent activities
  const recentActivities = [
    { time: '2 hours ago', activity: 'Completed morning workout', type: 'fitness' },
    { time: 'Yesterday', activity: 'Had consultation with Dr. Smith', type: 'consultation' },
    { time: '2 days ago', activity: 'Submitted weekly health report', type: 'report' },
    { time: '3 days ago', activity: 'Achieved hydration goal', type: 'achievement' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Health Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your health overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {healthMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} from last week
                </span>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Activity Chart */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Activity</h2>
            <select className="border rounded-lg px-3 py-1 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="h-64">
            <Line 
              data={activityData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>
        </div>

        {/* Health Score */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Score Breakdown</h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={healthScoreData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'fitness' ? 'bg-green-100' :
                    activity.type === 'consultation' ? 'bg-blue-100' :
                    activity.type === 'report' ? 'bg-purple-100' : 'bg-yellow-100'
                  }`}>
                    {activity.type === 'fitness' && <Dumbbell size={16} className="text-green-600" />}
                    {activity.type === 'consultation' && <Heart size={16} className="text-blue-600" />}
                    {activity.type === 'report' && <TrendingUp size={16} className="text-purple-600" />}
                    {activity.type === 'achievement' && <Droplets size={16} className="text-yellow-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.activity}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Start New Health Test
            </button>
            <button className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
              Book Doctor Consultation
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              View Health Insights
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Set Reminders
            </button>
          </div>

          {/* Health Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-blue-600 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-blue-900">Health Tip</p>
                <p className="text-sm text-blue-700 mt-1">Stay hydrated! Drink at least 8 glasses of water today.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}