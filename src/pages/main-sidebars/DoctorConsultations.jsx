import React, { useState } from "react";
import {
  Video,
  MessageSquare,
  Calendar,
  Clock,
  Star,
  MapPin,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function DoctorConsultations() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      rating: 4.9,
      reviews: 124,
      experience: "15 years",
      fee: "$120",
      available: true,
      nextAvailable: "Today, 3:00 PM",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "General Physician",
      rating: 4.8,
      reviews: 89,
      experience: "12 years",
      fee: "$90",
      available: true,
      nextAvailable: "Tomorrow, 10:00 AM",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      languages: ["English", "Mandarin"],
    },
    {
      id: 3,
      name: "Dr. Emily Brown",
      specialization: "Psychiatrist",
      rating: 4.7,
      reviews: 156,
      experience: "8 years",
      fee: "$150",
      available: false,
      nextAvailable: "Jan 18, 2:00 PM",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      languages: ["English"],
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      specialization: "Nutritionist",
      rating: 4.9,
      reviews: 67,
      experience: "10 years",
      fee: "$80",
      available: true,
      nextAvailable: "Today, 5:00 PM",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      languages: ["English", "French"],
    },
    {
      id: 5,
      name: "Dr. Amanda Lee",
      specialization: "Sleep Specialist",
      rating: 4.6,
      reviews: 45,
      experience: "7 years",
      fee: "$110",
      available: true,
      nextAvailable: "Tomorrow, 11:00 AM",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
      languages: ["English", "Korean"],
    },
    {
      id: 6,
      name: "Dr. James Miller",
      specialization: "Sports Medicine",
      rating: 4.8,
      reviews: 92,
      experience: "14 years",
      fee: "$130",
      available: false,
      nextAvailable: "Jan 20, 9:00 AM",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      languages: ["English", "German"],
    },
  ];

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "30 mins",
      type: "video",
      status: "upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Robert Wilson",
      specialization: "Nutritionist",
      date: "2024-01-18",
      time: "3:00 PM",
      duration: "45 mins",
      type: "in-person",
      status: "upcoming",
    },
    {
      id: 3,
      doctor: "Dr. Michael Chen",
      specialization: "General Physician",
      date: "2024-01-15",
      time: "11:00 AM",
      duration: "30 mins",
      type: "video",
      status: "completed",
    },
    {
      id: 4,
      doctor: "Dr. Emily Brown",
      specialization: "Psychiatrist",
      date: "2024-01-10",
      time: "2:00 PM",
      duration: "60 mins",
      type: "video",
      status: "completed",
    },
  ];

  const filteredAppointments = appointments.filter(
    (app) => activeTab === "all" || app.status === activeTab,
  );

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Doctor Consultations
        </h1>
        <p className="text-gray-600 mt-2">
          Book appointments with verified healthcare professionals
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {["upcoming", "completed", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab} (
              {tab === "all"
                ? appointments.length
                : appointments.filter((a) => a.status === tab).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search doctors by name or specialization..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Available Doctors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>
                {doctor.available ? (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-md">
                    <CheckCircle size={14} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      Available
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-50 rounded-md">
                    <XCircle size={14} className="text-red-600" />
                    <span className="text-sm font-medium text-red-700">
                      Busy
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500" size={16} />
                    <span className="font-bold text-gray-900">
                      {doctor.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    {doctor.fee}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>{doctor.experience} experience</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>Next: {doctor.nextAvailable}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <Video size={18} />
                  Book Video Call
                </button>
                <button className="px-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">My Appointments</h2>
          <p className="text-gray-600 mt-1">
            Manage your upcoming and past consultations
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Doctor
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Date & Time
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Type
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Duration
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
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Video className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {appointment.doctor}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.specialization}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">
                        {appointment.date}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.time}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.type === "video"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {appointment.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {appointment.duration}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {appointment.status === "upcoming" ? (
                        <>
                          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                            Join Call
                          </button>
                          <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            Reschedule
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-1">
                            <MessageSquare size={16} />
                            Chat
                          </button>
                          <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            Review
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-gray-400" size={48} />
            <p className="text-gray-500 mt-4">No appointments found</p>
            <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">
              Book New Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
