import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Share2,
  Calendar,
  TrendingUp,
  BarChart3,
  Filter,
  Search,
  Eye,
  Archive,
} from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../config/env.js";

export default function MyReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [myReports, setMyReports] = useState([]);

  useEffect(() => {
    const myReports = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/my-reports`);
        setMyReports(res.data.data);
      } catch {
        console.log("Error While Fetching the Reports");
      }
    };
    myReports();
  }, []);

  const reportTypes = [
    { id: "all", label: "All Reports", count: 12 },
    { id: "comprehensive", label: "Comprehensive", count: 3 },
    { id: "specialized", label: "Specialized", count: 5 },
    { id: "mental", label: "Mental Health", count: 2 },
    { id: "nutrition", label: "Nutrition", count: 1 },
    { id: "fitness", label: "Fitness", count: 1 },
  ];

  const filteredReports = myReports.filter((report) => {
    const matchesSearch = report.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              My Health Reports
            </h1>
            <p className="text-gray-600 mt-2">
              Access and manage all your health assessments and reports
            </p>
          </div>
          <button className="bg-indigo-600 hover:cursor-pointer text-white px-5 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 whitespace-nowrap">
            <FileText size={20} />
            Generate New Report
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <select
              className="border border-gray-300 hover:cursor-pointer rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label} ({type.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Report Type Filters */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-4 py-2 hover:cursor-pointer rounded-lg whitespace-nowrap transition-all ${
                filterType === type.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span className="font-medium">{type.label}</span>
              <span
                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  filterType === type.id
                    ? "bg-indigo-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {type.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Report Title
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Doctor
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Score
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50">
                        <FileText className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {report.title}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          {report.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-700">{report.date}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{report.doctor}</td>
                  <td className="py-4 px-6">
                    {report.score ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              report.score >= 80
                                ? "bg-green-600"
                                : report.score >= 60
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                            }`}
                            style={{ width: `${report.score}%` }}
                          />
                        </div>
                        <span className="font-bold text-gray-900">
                          {report.score}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}
                    >
                      {report.status.charAt(0).toUpperCase() +
                        report.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:cursor-pointer hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:cursor-pointer hover:text-green-600 hover:bg-green-50 rounded-lg">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:cursor-pointer hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Share2 size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:cursor-pointer hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                        <Archive size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto text-gray-400" size={48} />
            <p className="text-gray-500 mt-4">No reports found</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Average Health Score
            </h3>
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-900">84.2</p>
          <p className="text-sm text-green-600 mt-2">+5.2% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Total Reports</h3>
            <FileText className="text-indigo-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-600 mt-2">6 reports this year</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Trend Analysis</h3>
            <BarChart3 className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-900">Improving</p>
          <p className="text-sm text-blue-600 mt-2">
            Positive trend in last 3 months
          </p>
        </div>
      </div>
    </div>
  );
}
