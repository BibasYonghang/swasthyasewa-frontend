import React, { useState } from "react";
import {
  Video,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Calendar,
  MessageSquare,
  CheckCircle,
  X,
  Play,
  MapPin,
  Award,
} from "lucide-react";

export default function VideoConsult() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStep, setBookingStep] = useState(null);
  const [priceFilter, setPriceFilter] = useState("all");

  // Mock doctor data
  const mockDoctors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialty: "General Medicine",
      qualification: "MBBS, MD",
      experience: 12,
      rating: 4.9,
      reviews: 324,
      consultationFee: 500,
      responseTime: "< 5 min",
      patients: 1234,
      imageUrl:
        "https://images.unsplash.com/photo-1622496131280-9b5f0a0c19ad?w=300&h=300&fit=crop",
      bio: "Experienced physician specializing in general health and chronic disease management.",
      languages: ["English", "Hindi", "Nepali"],
      availableToday: true,
      nextAvailableSlot: "2:00 PM",
      totalConsultations: 2543,
      verified: true,
      aboutMe:
        "I have been practicing medicine for over 12 years and believe in patient-centric care.",
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialty: "Cardiology",
      qualification: "MBBS, MD Cardiology",
      experience: 10,
      rating: 4.8,
      reviews: 287,
      consultationFee: 700,
      responseTime: "< 3 min",
      patients: 892,
      imageUrl:
        "https://images.unsplash.com/photo-1594824476967-48c676c89a0f?w=300&h=300&fit=crop",
      bio: "Specialist in heart diseases and cardiovascular health.",
      languages: ["English", "Hindi"],
      availableToday: true,
      nextAvailableSlot: "3:30 PM",
      totalConsultations: 1876,
      verified: true,
      aboutMe:
        "Passionate about preventive cardiology and helping patients maintain heart health.",
    },
    {
      id: 3,
      name: "Dr. Arjun Singh",
      specialty: "Orthopedics",
      qualification: "MBBS, MS Orthopedics",
      experience: 15,
      rating: 4.7,
      reviews: 412,
      consultationFee: 600,
      responseTime: "< 10 min",
      patients: 1567,
      imageUrl:
        "https://images.unsplash.com/photo-1612349317453-3ad32c4a0b5f?w=300&h=300&fit=crop",
      bio: "Expert in bone and joint disorders.",
      languages: ["English", "Hindi", "Nepali"],
      availableToday: false,
      nextAvailableSlot: "Tomorrow 10:00 AM",
      totalConsultations: 3124,
      verified: true,
      aboutMe:
        "Specializing in sports medicine and joint preservation techniques.",
    },
    {
      id: 4,
      name: "Dr. Neha Gupta",
      specialty: "Dermatology",
      qualification: "MBBS, MD Dermatology",
      experience: 8,
      rating: 4.6,
      reviews: 198,
      consultationFee: 550,
      responseTime: "< 7 min",
      patients: 654,
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      bio: "Skincare specialist with expertise in acne and anti-aging treatments.",
      languages: ["English", "Hindi"],
      availableToday: true,
      nextAvailableSlot: "1:00 PM",
      totalConsultations: 1243,
      verified: true,
      aboutMe:
        "I believe healthy skin is a reflection of overall health and well-being.",
    },
    {
      id: 5,
      name: "Dr. Amit Patel",
      specialty: "Pediatrics",
      qualification: "MBBS, MD Pediatrics",
      experience: 11,
      rating: 4.9,
      reviews: 356,
      consultationFee: 480,
      responseTime: "< 4 min",
      patients: 1123,
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
      bio: "Child health specialist with special interest in developmental issues.",
      languages: ["English", "Hindi", "Gujarati", "Nepali"],
      availableToday: true,
      nextAvailableSlot: "4:00 PM",
      totalConsultations: 2876,
      verified: true,
      aboutMe:
        "Dedicated to providing compassionate care for children and supporting parents.",
    },
    {
      id: 6,
      name: "Dr. Meera Desai",
      specialty: "Psychiatry",
      qualification: "MBBS, MD Psychiatry",
      experience: 9,
      rating: 4.8,
      reviews: 267,
      consultationFee: 600,
      responseTime: "< 6 min",
      patients: 723,
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      bio: "Mental health counselor specializing in anxiety and depression.",
      languages: ["English", "Hindi"],
      availableToday: true,
      nextAvailableSlot: "5:00 PM",
      totalConsultations: 1654,
      verified: true,
      aboutMe:
        "Creating a safe space for mental health discussions and healing.",
    },
  ];

  const specialties = [
    "all",
    "General Medicine",
    "Cardiology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Psychiatry",
  ];

  const availableSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  React.useEffect(() => {
    setDoctors(mockDoctors);
    setFilteredDoctors(mockDoctors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    let filtered = doctors;

    // Filter by specialty
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter((doc) => doc.specialty === selectedSpecialty);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by price
    if (priceFilter !== "all") {
      if (priceFilter === "low") {
        filtered = filtered.filter((doc) => doc.consultationFee <= 500);
      } else if (priceFilter === "medium") {
        filtered = filtered.filter(
          (doc) => doc.consultationFee > 500 && doc.consultationFee <= 700,
        );
      } else if (priceFilter === "high") {
        filtered = filtered.filter((doc) => doc.consultationFee > 700);
      }
    }

    // Sort by rating
    filtered.sort((a, b) => b.rating - a.rating);

    setFilteredDoctors(filtered);
  }, [searchTerm, selectedSpecialty, priceFilter, doctors]);

  return (
    <div className="min-h-screen bg-liner-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Video Consultation
              </h1>
              <p className="text-gray-600 text-sm">
                Connect with experienced doctors from your home
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex gap-2">
              <Filter className="w-5 h-5 text-gray-600 mt-1" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec === "all" ? "All Specialties" : spec}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Prices</option>
              <option value="low">Up to Rs. 500</option>
              <option value="medium">Rs. 500 - 700</option>
              <option value="high">Above Rs. 700</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctors List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Available Doctors ({filteredDoctors.length})
              </h2>
            </div>

            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border-l-4 overflow-hidden ${
                    selectedDoctor?.id === doctor.id
                      ? "border-green-500 shadow-lg"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex gap-4 p-4">
                    {/* Doctor Image */}
                    <div className="w-24 h-24 shrink-0">
                      <img
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-gray-800">
                              {doctor.name}
                            </h3>
                            {doctor.verified && (
                              <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {doctor.specialty}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {doctor.qualification}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold text-gray-700">
                            {doctor.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({doctor.reviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Award className="w-4 h-4" />
                          {doctor.experience} yrs exp.
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          {doctor.patients} patients
                        </div>
                      </div>

                      {/* Status and Fee */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold ${
                              doctor.availableToday
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          >
                            ● {doctor.nextAvailableSlot}
                          </span>
                          <span className="text-xs text-gray-500">
                            Response: {doctor.responseTime}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          Rs. {doctor.consultationFee}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Details Panel */}
          <div className="lg:col-span-1">
            {selectedDoctor ? (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-24">
                {/* Header */}
                <div className="relative bg-liner-to-r from-green-400 to-green-600 p-4">
                  <button
                    onClick={() => setSelectedDoctor(null)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img
                    src={selectedDoctor.imageUrl}
                    alt={selectedDoctor.name}
                    className="w-20 h-20 rounded-full border-4 border-white mx-auto"
                  />
                </div>

                <div className="p-4">
                  {/* Doctor Name and Title */}
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-1">
                    {selectedDoctor.name}
                  </h2>
                  <p className="text-center text-sm text-gray-600 mb-4 pb-4 border-b">
                    {selectedDoctor.specialty}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedDoctor.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold">
                      {selectedDoctor.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({selectedDoctor.reviews})
                    </span>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-3 mb-4 pb-4 border-b">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-semibold text-gray-800">
                        {selectedDoctor.experience} years
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total Consultations</span>
                      <span className="font-semibold text-gray-800">
                        {selectedDoctor.totalConsultations}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-semibold text-gray-800">
                        {selectedDoctor.responseTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Languages</span>
                      <span className="font-semibold text-gray-800">
                        {selectedDoctor.languages.length}
                      </span>
                    </div>
                  </div>

                  {/* About */}
                  <div className="mb-4 pb-4 border-b">
                    <p className="text-sm text-gray-700">
                      {selectedDoctor.aboutMe}
                    </p>
                  </div>

                  {/* Consultation Fee */}
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-gray-600 mb-1">
                      Consultation Fee
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      Rs. {selectedDoctor.consultationFee}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setBookingStep("date")}
                      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      Book Video Consult
                    </button>
                    <button className="w-full border border-green-500 text-green-500 py-2 rounded-lg hover:bg-green-50 font-semibold transition-colors flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-semibold">
                  Select a doctor to view details
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Choose from the list to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Booking Modal */}
        {bookingStep === "date" && selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">
                  Book Appointment
                </h3>
                <button
                  onClick={() => setBookingStep(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Doctor Info */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <img
                    src={selectedDoctor.imageUrl}
                    alt={selectedDoctor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {selectedDoctor.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedDoctor.specialty}
                    </p>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                          selectedTime === slot
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm Button */}
                <div className="pt-4 space-y-2">
                  <button
                    disabled={!selectedDate || !selectedTime}
                    className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                      selectedDate && selectedTime
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => setBookingStep(null)}
                    className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
