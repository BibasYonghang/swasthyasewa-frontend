import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Search,
  Filter,
  Navigation,
  ChevronRight,
  X,
} from "lucide-react";

export default function NearbyClinics() {
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("distance");

  // Mock clinic data with realistic information
  const mockClinics = [
    {
      id: 1,
      name: "City Medical Center",
      address: "123 Health Street, Downtown",
      distance: 0.5,
      phone: "+977-1-4123456",
      rating: 4.8,
      reviews: 245,
      openTime: "08:00",
      closeTime: "20:00",
      specialty: ["General", "Cardiology", "Orthopedics"],
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop",
      availability: "Open Now",
      doctors: 12,
      emergencyService: true,
    },
    {
      id: 2,
      name: "Heart Care Clinic",
      address: "456 Medical Plaza, Midtown",
      distance: 1.2,
      phone: "+977-1-4234567",
      rating: 4.6,
      reviews: 189,
      openTime: "09:00",
      closeTime: "18:00",
      specialty: ["Cardiology", "General"],
      imageUrl:
        "https://images.unsplash.com/photo-1537368310025-700d6d9b0e32?w=300&h=200&fit=crop",
      availability: "Open Now",
      doctors: 8,
      emergencyService: false,
    },
    {
      id: 3,
      name: "Bone & Joint Center",
      address: "789 Wellness Way, Uptown",
      distance: 1.8,
      phone: "+977-1-4345678",
      rating: 4.7,
      reviews: 156,
      openTime: "08:30",
      closeTime: "19:30",
      specialty: ["Orthopedics", "Physiotherapy"],
      imageUrl:
        "https://images.unsplash.com/photo-1631217261294-c98c3c55dcda?w=300&h=200&fit=crop",
      availability: "Open Now",
      doctors: 10,
      emergencyService: true,
    },
    {
      id: 4,
      name: "General Health Hub",
      address: "321 Clinic Road, Suburban Area",
      distance: 2.1,
      phone: "+977-1-4456789",
      rating: 4.5,
      reviews: 120,
      openTime: "07:00",
      closeTime: "21:00",
      specialty: ["General", "Pediatrics", "Dermatology"],
      imageUrl:
        "https://images.unsplash.com/photo-1567532471141-a13e85dd4e98?w=300&h=200&fit=crop",
      availability: "Open Now",
      doctors: 15,
      emergencyService: true,
    },
    {
      id: 5,
      name: "Eye Care Specialists",
      address: "654 Vision Street, Downtown",
      distance: 0.8,
      phone: "+977-1-4567890",
      rating: 4.9,
      reviews: 312,
      openTime: "09:00",
      closeTime: "17:00",
      specialty: ["Ophthalmology"],
      imageUrl:
        "https://images.unsplash.com/photo-1576091160368-112cabee46c7?w=300&h=200&fit=crop",
      availability: "Open Now",
      doctors: 6,
      emergencyService: false,
    },
    {
      id: 6,
      name: "Dental Excellence",
      address: "987 Smile Avenue, Midtown",
      distance: 1.5,
      phone: "+977-1-4678901",
      rating: 4.7,
      reviews: 203,
      openTime: "08:00",
      closeTime: "18:00",
      specialty: ["Dentistry"],
      imageUrl:
        "https://images.unsplash.com/photo-1600267185393-e158a98703de?w=300&h=200&fit=crop",
      availability: "Closes in 2 hours",
      doctors: 9,
      emergencyService: false,
    },
  ];

  const specialties = [
    "all",
    "General",
    "Cardiology",
    "Orthopedics",
    "Ophthalmology",
    "Dentistry",
    "Pediatrics",
  ];

  useEffect(() => {
    // Simulate loading clinics
    setLoading(true);
    const timer = setTimeout(() => {
      setClinics(mockClinics);
      setFilteredClinics(mockClinics);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = clinics;

    // Filter by specialty
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter((clinic) =>
        clinic.specialty.includes(selectedSpecialty),
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (clinic) =>
          clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          clinic.address.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort
    if (sortBy === "distance") {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "availability") {
      filtered.sort((a, b) => a.distance - b.distance);
    }

    setFilteredClinics(filtered);
  }, [searchTerm, selectedSpecialty, sortBy, clinics]);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Find Nearby Clinics
          </h1>

          {/* Search Bar */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search clinic name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Near Me
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedSpecialty === specialty
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex gap-2 mt-3">
            <Filter className="w-5 h-5 text-gray-600 mt-1" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="availability">Sort by Availability</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 mt-4">Loading clinics...</p>
          </div>
        ) : filteredClinics.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No clinics found</p>
            <p className="text-gray-400">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Clinics List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {filteredClinics.map((clinic) => (
                  <div
                    key={clinic.id}
                    onClick={() => setSelectedClinic(clinic)}
                    className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer border-l-4 ${
                      selectedClinic?.id === clinic.id
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex gap-4 p-4">
                      {/* Clinic Image */}
                      <div className="w-24 h-24 shrink-0">
                        <img
                          src={clinic.imageUrl}
                          alt={clinic.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Clinic Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">
                              {clinic.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <MapPin className="w-4 h-4" />
                              {clinic.address}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>

                        {/* Rating and Distance */}
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-semibold text-gray-700">
                              {clinic.rating}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({clinic.reviews})
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-blue-600">
                            {clinic.distance} km
                          </span>
                        </div>

                        {/* Specialty Tags */}
                        <div className="flex gap-2 flex-wrap mb-2">
                          {clinic.specialty.slice(0, 2).map((spec, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                              {spec}
                            </span>
                          ))}
                          {clinic.specialty.length > 2 && (
                            <span className="text-xs text-gray-600">
                              +{clinic.specialty.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-600 font-semibold">
                            ● {clinic.availability}
                          </span>
                          <span className="text-gray-600">
                            {clinic.doctors} doctors available
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinic Details Panel */}
            <div className="lg:col-span-1">
              {selectedClinic ? (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-24">
                  <div className="relative">
                    <img
                      src={selectedClinic.imageUrl}
                      alt={selectedClinic.name}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => setSelectedClinic(null)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {selectedClinic.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(selectedClinic.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">
                        {selectedClinic.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({selectedClinic.reviews} reviews)
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {selectedClinic.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <a
                            href={`tel:${selectedClinic.phone}`}
                            className="text-sm font-semibold text-blue-600 hover:underline"
                          >
                            {selectedClinic.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Hours</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {selectedClinic.openTime} -{" "}
                            {selectedClinic.closeTime}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Distance */}
                    <div className="mb-4 pb-4 border-b">
                      <p className="text-sm text-gray-600 mb-1">Distance</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {selectedClinic.distance} km
                      </p>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-800 mb-2">
                        Specialties
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedClinic.specialty.map((spec, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Emergency Service Badge */}
                    {selectedClinic.emergencyService && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-xs font-semibold text-red-700">
                          🚑 24/7 Emergency Service Available
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold transition-colors">
                        Book Appointment
                      </button>
                      <button className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50 font-semibold transition-colors">
                        Call Clinic
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 font-semibold transition-colors">
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Select a clinic to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
