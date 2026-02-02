import React, { useState, useMemo } from "react";
import {
  Search,
  Star,
  ShoppingCart,
  Filter,
  AlertCircle,
  Package,
  Truck,
  Heart,
} from "lucide-react";

const Medications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState([]);

  const categories = [
    "All",
    "Pain Relief",
    "Cold & Cough",
    "Allergy",
    "Digestive Health",
    "Vitamins & Minerals",
    "Antibiotics",
    "Anti-Inflammatory",
  ];

  const filteredMedications = useMemo(() => {
    const medications = [
      {
        id: 1,
        name: "Paracetamol 500mg",
        category: "Pain Relief",
        brand: "Crocin",
        price: 45,
        mrp: 65,
        rating: 4.7,
        reviews: 234,
        availability: "In Stock",
        stock: 120,
        uses: ["Fever", "Headache", "Body Pain"],
        dosage: "1 tablet twice daily",
        sideEffects: ["Mild dizziness", "Nausea"],
        image: "💊",
        verified: true,
        deliveryDays: "Next day delivery",
        discount: 31,
        description: "Fast relief from fever and body pain",
      },
      {
        id: 2,
        name: "Aspirin 325mg",
        category: "Pain Relief",
        brand: "Bayer",
        price: 55,
        mrp: 80,
        rating: 4.5,
        reviews: 156,
        availability: "In Stock",
        stock: 95,
        uses: ["Pain", "Fever", "Heart Health"],
        dosage: "1 tablet once daily",
        sideEffects: ["Stomach upset"],
        image: "💊",
        verified: true,
        deliveryDays: "2-3 days delivery",
        discount: 31,
        description: "Effective pain reliever and anti-inflammatory",
      },
      {
        id: 3,
        name: "Ibuprofen 400mg",
        category: "Anti-Inflammatory",
        brand: "Brufen",
        price: 65,
        mrp: 95,
        rating: 4.8,
        reviews: 312,
        availability: "In Stock",
        stock: 150,
        uses: ["Inflammation", "Pain", "Fever"],
        dosage: "1 tablet thrice daily",
        sideEffects: ["Stomach pain", "Headache"],
        image: "💊",
        verified: true,
        deliveryDays: "Next day delivery",
        discount: 32,
        description: "Anti-inflammatory tablet for joint pain",
      },
      {
        id: 4,
        name: "Cough Syrup",
        category: "Cold & Cough",
        brand: "Robitussin",
        price: 120,
        mrp: 180,
        rating: 4.6,
        reviews: 189,
        availability: "In Stock",
        stock: 80,
        uses: ["Dry cough", "Cold", "Throat irritation"],
        dosage: "10ml twice daily",
        sideEffects: ["Drowsiness"],
        image: "🧴",
        verified: true,
        deliveryDays: "Next day delivery",
        discount: 33,
        description: "Soothing cough syrup for dry coughs",
      },
      {
        id: 5,
        name: "Antihistamine Tablet",
        category: "Allergy",
        brand: "Allegra",
        price: 85,
        mrp: 125,
        rating: 4.7,
        reviews: 267,
        availability: "In Stock",
        stock: 110,
        uses: ["Allergy", "Hay fever", "Skin rashes"],
        dosage: "1 tablet once daily",
        sideEffects: ["Dry mouth", "Drowsiness"],
        image: "💊",
        verified: true,
        deliveryDays: "2-3 days delivery",
        discount: 32,
        description: "Relief from allergic reactions",
      },
      {
        id: 6,
        name: "Omeprazole 20mg",
        category: "Digestive Health",
        brand: "Nexium",
        price: 110,
        mrp: 165,
        rating: 4.8,
        reviews: 298,
        availability: "Low Stock",
        stock: 25,
        uses: ["Acidity", "GERD", "Heartburn"],
        dosage: "1 tablet once daily before breakfast",
        sideEffects: ["Headache", "Nausea"],
        image: "💊",
        verified: true,
        deliveryDays: "3-4 days delivery",
        discount: 33,
        description: "Effective acid reflux medication",
      },
      {
        id: 7,
        name: "Multivitamin",
        category: "Vitamins & Minerals",
        brand: "Revital",
        price: 180,
        mrp: 250,
        rating: 4.6,
        reviews: 445,
        availability: "In Stock",
        stock: 200,
        uses: ["Immunity", "Energy", "Overall health"],
        dosage: "1 tablet daily after breakfast",
        sideEffects: ["Rarely", "Generally safe"],
        image: "💊",
        verified: true,
        deliveryDays: "Next day delivery",
        discount: 28,
        description: "Daily multivitamin for complete nutrition",
      },
      {
        id: 8,
        name: "Iron Supplement",
        category: "Vitamins & Minerals",
        brand: "Fersolate",
        price: 95,
        mrp: 140,
        rating: 4.5,
        reviews: 203,
        availability: "In Stock",
        stock: 85,
        uses: ["Anemia", "Iron deficiency", "Fatigue"],
        dosage: "1 tablet daily",
        sideEffects: ["Dark stools", "Constipation"],
        image: "💊",
        verified: true,
        deliveryDays: "2-3 days delivery",
        discount: 32,
        description: "Iron supplement for anemia treatment",
      },
      {
        id: 9,
        name: "Vitamin D3 1000IU",
        category: "Vitamins & Minerals",
        brand: "Nature's Bounty",
        price: 150,
        mrp: 220,
        rating: 4.7,
        reviews: 356,
        availability: "In Stock",
        stock: 130,
        uses: ["Bone health", "Immunity", "Calcium absorption"],
        dosage: "1 tablet daily",
        sideEffects: ["Very rare"],
        image: "💊",
        verified: true,
        deliveryDays: "Next day delivery",
        discount: 32,
        description: "Vitamin D for strong bones and immunity",
      },
      {
        id: 10,
        name: "Antibiotic Capsule",
        category: "Antibiotics",
        brand: "Amoxil",
        price: 125,
        mrp: 180,
        rating: 4.6,
        reviews: 178,
        availability: "In Stock",
        stock: 60,
        uses: ["Bacterial infection", "Throat infection"],
        dosage: "1 capsule thrice daily",
        sideEffects: ["Allergic reaction", "Diarrhea"],
        image: "💊",
        verified: true,
        deliveryDays: "2-3 days delivery",
        discount: 31,
        description: "Antibiotic for bacterial infections",
      },
    ];
    let result = medications.filter((med) => {
      const matchSearch =
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === "All" || med.category === selectedCategory;

      const matchPrice =
        selectedPrice === "All" ||
        (selectedPrice === "0-100" && med.price <= 100) ||
        (selectedPrice === "100-200" && med.price > 100 && med.price <= 200) ||
        (selectedPrice === "200+" && med.price > 200);

      const matchAvailability =
        selectedAvailability === "All" ||
        (selectedAvailability === "In Stock" &&
          med.availability === "In Stock") ||
        (selectedAvailability === "Low Stock" &&
          med.availability === "Low Stock");

      return matchSearch && matchCategory && matchPrice && matchAvailability;
    });

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "discount") {
      result.sort((a, b) => b.discount - a.discount);
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedPrice,
    selectedAvailability,
    sortBy,
  ]);

  const addToCart = (medication) => {
    setCart([...cart, medication]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Medications</h1>
          <p className="text-gray-600">
            Wide range of medicines delivered to your doorstep
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by medicine name, brand, or use..."
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
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Price Filter */}
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
              >
                <option value="All">All Prices</option>
                <option value="0-100">₹0 - ₹100</option>
                <option value="100-200">₹100 - ₹200</option>
                <option value="200+">₹200+</option>
              </select>

              {/* Availability Filter */}
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
              >
                <option value="All">All Availability</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price-low">Sort by Price (Low to High)</option>
                <option value="price-high">Sort by Price (High to Low)</option>
                <option value="discount">Sort by Discount</option>
              </select>
            </div>

            {/* Cart Button */}
            {cart.length > 0 && (
              <button className="relative flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold">
                <ShoppingCart size={18} />
                Cart ({cart.length})
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Found{" "}
            <span className="text-indigo-600 font-bold">
              {filteredMedications.length}
            </span>{" "}
            medications
          </p>
        </div>

        {/* Medications Grid */}
        {filteredMedications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedications.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
              >
                {/* Header with color accent */}
                <div className="bg-linear-to-r from-green-600 to-blue-600 h-2"></div>

                {/* Medicine Info */}
                <div className="p-6">
                  {/* Badge and Avatar */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-4xl mb-2">{med.image}</div>
                      <div className="flex gap-2">
                        {med.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                            ✓ Verified
                          </span>
                        )}
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">
                          {med.discount}% OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Name and Brand */}
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {med.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Brand:{" "}
                    <span className="font-semibold text-indigo-600">
                      {med.brand}
                    </span>
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(med.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-sm font-semibold text-gray-700">
                      {med.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({med.reviews})
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {med.description}
                  </p>

                  {/* Category */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 font-semibold">
                      Category
                    </p>
                    <p className="text-sm font-bold text-blue-700">
                      {med.category}
                    </p>
                  </div>

                  {/* Uses Tags */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 font-semibold mb-2">
                      Uses
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {med.uses.map((use) => (
                        <span
                          key={use}
                          className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dosage and Side Effects */}
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 font-semibold">
                        Dosage
                      </p>
                      <p className="text-xs text-gray-800 mt-1">{med.dosage}</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 font-semibold">
                        Storage
                      </p>
                      <p className="text-xs text-gray-800 mt-1">Room temp</p>
                    </div>
                  </div>

                  {/* Stock and Delivery */}
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                      <Package size={16} className="text-green-600" />
                      <div>
                        <p className="text-xs text-green-700 font-semibold">
                          {med.availability}
                        </p>
                        <p className="text-xs text-green-600">
                          {med.stock} units
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <Truck size={16} className="text-blue-600" />
                      <div>
                        <p className="text-xs text-blue-700 font-semibold">
                          Delivery
                        </p>
                        <p className="text-xs text-blue-600">
                          {med.deliveryDays}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Price</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold text-indigo-600">
                            ₹{med.price}
                          </p>
                          <p className="text-sm text-gray-400 line-through">
                            ₹{med.mrp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => addToCart(med)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold text-sm"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all font-semibold text-sm">
                      <Heart size={18} />
                      Save
                    </button>
                  </div>

                  {/* Info */}
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200 flex items-start gap-2">
                    <AlertCircle
                      size={16}
                      className="text-yellow-600 mt-1 shrink-0"
                    />
                    <div>
                      <p className="text-xs text-yellow-800 font-semibold">
                        Consult your doctor before use
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Side effects: {med.sideEffects.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No medications found
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

export default Medications;
