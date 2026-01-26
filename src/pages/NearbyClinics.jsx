import React, { useState, useEffect } from "react";

const MapPin = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
  </svg>
);

const Phone = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const Clock = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Star = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const Search = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Filter = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const Navigation = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const X = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Users = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const ChevronDown = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const Grid = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const List = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export default function NearbyClinics() {
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("distance");
  const [viewMode, setViewMode] = useState("list");
  const [showFilters, setShowFilters] = useState(false);

  const specialties = [
    "all",
    "General",
    "Cardiology",
    "Orthopedics",
    "Ophthalmology",
    "Dentistry",
    "Pediatrics",
  ];

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject("Geolocation not supported");
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        (err) => reject(err),
        { enableHighAccuracy: true },
      );
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const fetchNearbyClinics = async (lat, lon) => {
    const query = `[out:json];(node["amenity"="hospital"](around:5000,${lat},${lon});node["amenity"="clinic"](around:5000,${lat},${lon});node["healthcare"="doctor"](around:5000,${lat},${lon}););out body;`;
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });
    const data = await response.json();
    return data.elements;
  };

  useEffect(() => {
    const loadClinics = async () => {
      try {
        setLoading(true);
        const location = await getUserLocation();
        const results = await fetchNearbyClinics(location.lat, location.lon);
        const formatted = results.map((place, i) => ({
          id: place.id || i,
          name: place.tags?.name || "Medical Center",
          address:
            place.tags?.["addr:street"] ||
            place.tags?.["addr:city"] ||
            "Nearby location",
          distance: calculateDistance(
            location.lat,
            location.lon,
            place.lat,
            place.lon,
          ).toFixed(2),
          phone: place.tags?.phone || "Not available",
          rating: (Math.random() * 1 + 4).toFixed(1),
          reviews: Math.floor(Math.random() * 200),
          openTime: "08:00",
          closeTime: "20:00",
          specialty: ["General"],
          imageUrl:
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop",
          availability: "Open Now",
          doctors: Math.floor(Math.random() * 15) + 1,
          emergencyService: place.tags?.amenity === "hospital",
        }));
        setClinics(formatted);
        setFilteredClinics(formatted);
      } catch (error) {
        console.error(error);
        alert("Please allow location access to find nearby clinics.");
      } finally {
        setLoading(false);
      }
    };
    loadClinics();
  }, []);

  useEffect(() => {
    let filtered = [...clinics];
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter((clinic) =>
        clinic.specialty.includes(selectedSpecialty),
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (clinic) =>
          clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          clinic.address.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (sortBy === "distance") {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    setFilteredClinics(filtered);
  }, [searchTerm, selectedSpecialty, sortBy, clinics]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Find Nearby Clinics
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setViewMode(viewMode === "list" ? "grid" : "list")
                }
                className="sm:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                {viewMode === "list" ? (
                  <Grid className="w-5 h-5" />
                ) : (
                  <List className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg flex items-center gap-2 text-sm sm:text-base"
              >
                <Navigation className="w-4 h-4" />
                <span className="hidden sm:inline">Near Me</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search clinic name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <div
            className={`${showFilters ? "block" : "hidden"} sm:block space-y-3`}
          >
            <div className="flex gap-2 overflow-x-auto pb-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                    selectedSpecialty === specialty
                      ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="distance">Sort by Distance</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
              <div className="hidden sm:flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-100" : "bg-white"} border border-gray-300`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-100" : "bg-white"} border border-gray-300`}
                >
                  <Grid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid gap-4">
        {loading && (
          <p className="text-center text-gray-500">Loading clinics...</p>
        )}

        {filteredClinics.map((clinic) => (
          <div key={clinic.id} className="space-y-3">
            {/* ===== CLINIC CARD ===== */}
            <div
              onClick={() =>
                setSelectedClinic(
                  selectedClinic?.id === clinic.id ? null : clinic,
                )
              }
              className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer border-2 ${
                selectedClinic?.id === clinic.id
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <div className="flex gap-4 p-4">
                <img
                  src={clinic.imageUrl}
                  alt={clinic.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {clinic.name}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {clinic.address}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{clinic.rating}</span>
                      <span className="text-xs text-gray-500">
                        ({clinic.reviews})
                      </span>
                    </div>
                    <span className="font-semibold text-blue-600">
                      {clinic.distance} km
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-green-600 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {clinic.availability}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" /> {clinic.doctors} doctors
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {selectedClinic?.id === clinic.id && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative">
                  <img
                    src={selectedClinic.imageUrl}
                    alt={selectedClinic.name}
                    className="w-full h-56 object-cover"
                  />
                  <button
                    onClick={() => setSelectedClinic(null)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedClinic.name}
                  </h2>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">
                        {selectedClinic.address}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-600">
                        {selectedClinic.phone}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">
                        {selectedClinic.openTime} - {selectedClinic.closeTime}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {selectedClinic.distance} km
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full py-3 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold">
                      Book Appointment
                    </button>
                    <button className="w-full py-3 rounded-xl border-2 border-blue-500 text-blue-600 font-semibold">
                      Call Clinic
                    </button>
                    <button className="w-full py-3 rounded-xl border-2 border-gray-300 font-semibold">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
