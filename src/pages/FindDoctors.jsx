import React, { useState, useMemo } from "react";
import {
  Search,
  Star,
  MapPin,
  Calendar,
  MessageCircle,
  Video,
  Clock,
  Users,
  TrendingUp,
  Filter,
  ChevronDown,
} from "lucide-react";

const FindDoctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const specialties = useMemo(
    () => [
      "All",
      "Cardiologist",
      "General Practitioner",
      "Dermatologist",
      "Orthopedist",
      "Pediatrician",
      "Neurologist",
      "Gynecologist",
      "Pulmonologist",
    ],
    [],
  );

  const doctors = useMemo(
    () => [
      {
        id: 1,
        name: "Dr. Priya Sharma",
        specialty: "Cardiologist",
        experience: 12,
        rating: 4.8,
        reviews: 245,
        consultationFee: 500,
        availability: "Available Today",
        image: "👩‍⚕️",
        bio: "Expert in heart diseases",
        languages: ["English", "Hindi"],
        nextAvailable: "2:30 PM",
        patients: 2890,
        expertise: ["Heart Disease", "Hypertension", "Cardiology"],
      },
      {
        id: 2,
        name: "Dr. Rajesh Kumar",
        specialty: "General Practitioner",
        experience: 8,
        rating: 4.6,
        reviews: 189,
        consultationFee: 300,
        availability: "Available in 1 hour",
        image: "👨‍⚕️",
        bio: "Experienced GP",
        languages: ["English", "Hindi"],
        nextAvailable: "3:00 PM",
        patients: 1560,
        expertise: ["General Health"],
      },
    ],
    [],
  );

  const filteredDoctors = useMemo(() => {
    let result = doctors.filter((doctor) => {
      const matchSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.bio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSpecialty =
        selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;

      const matchExperience =
        selectedExperience === "All" ||
        (selectedExperience === "5+" && doctor.experience >= 5) ||
        (selectedExperience === "10+" && doctor.experience >= 10) ||
        (selectedExperience === "15+" && doctor.experience >= 15);

      const matchRating =
        selectedRating === "All" ||
        (selectedRating === "4.5+" && doctor.rating >= 4.5) ||
        (selectedRating === "4.7+" && doctor.rating >= 4.7) ||
        (selectedRating === "4.9+" && doctor.rating >= 4.9);

      return matchSearch && matchSpecialty && matchExperience && matchRating;
    });

    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "experience")
      result.sort((a, b) => b.experience - a.experience);
    else if (sortBy === "fee")
      result.sort((a, b) => a.consultationFee - b.consultationFee);
    else if (sortBy === "patients")
      result.sort((a, b) => b.patients - a.patients);

    return result;
  }, [
    doctors,
    searchQuery,
    selectedSpecialty,
    selectedExperience,
    selectedRating,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Find Doctors
          </h1>
          <p className="text-gray-600">
            Connect with experienced healthcare professionals
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold md:hidden"
            >
              <Filter size={18} />
              Filters {showFilters ? "✕" : ""}
            </button>

            {/* Filters - Responsive */}
            <div
              className={`${
                showFilters ? "flex" : "hidden md:flex"
              } flex-col md:flex-row gap-4 w-full md:w-auto flex-wrap`}
            >
              {/* Specialty Filter */}
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>

              {/* Experience Filter */}
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
              >
                <option value="All">All Experience</option>
                <option value="5+">5+ Years</option>
                <option value="10+">10+ Years</option>
                <option value="15+">15+ Years</option>
              </select>

              {/* Rating Filter */}
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
              >
                <option value="All">All Ratings</option>
                <option value="4.5+">4.5+</option>
                <option value="4.7+">4.7+</option>
                <option value="4.9+">4.9+ (Highly Rated)</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
              >
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
                <option value="fee">Sort by Fee (Low to High)</option>
                <option value="patients">Sort by Patients</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Found{" "}
            <span className="text-indigo-600 font-bold">
              {filteredDoctors.length}
            </span>{" "}
            doctors
          </p>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
              >
                {/* Header with color accent */}
                <div className="bg-linear-to-r from-indigo-600 to-purple-600 h-2"></div>
                <div className="p-6">
                  {/* Avatar and Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{doctor.image}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {doctor.name}
                      </h3>
                      <p className="text-indigo-600 font-semibold text-sm">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < Math.floor(doctor.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="text-sm font-semibold text-gray-700 ml-2">
                          {doctor.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({doctor.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{doctor.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-indigo-600" />
                      <div>
                        <p className="text-xs text-gray-600">Experience</p>
                        <p className="text-sm font-bold text-gray-800">
                          {doctor.experience}+ Years
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-indigo-600" />
                      <div>
                        <p className="text-xs text-gray-600">Patients</p>
                        <p className="text-sm font-bold text-gray-800">
                          {doctor.patients.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-green-600" />
                      <div>
                        <p className="text-xs text-green-700 font-semibold">
                          {doctor.availability}
                        </p>
                        <p className="text-xs text-green-600">
                          Next: {doctor.nextAvailable}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 font-semibold mb-2">
                      Expertise
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fee */}
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">Consultation Fee</p>
                      <p className="text-2xl font-bold text-indigo-600">
                        ₹{doctor.consultationFee}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Languages</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {doctor.languages.length}+ Languages
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold text-sm">
                      <Video size={18} />
                      Video Call
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all font-semibold text-sm">
                      <MessageCircle size={18} />
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctors;
