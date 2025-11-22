// src/pages/Register.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, ArrowRight } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: API CALL here
    console.log("Registering user:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  from-indigo-50 to-blue-100 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6">
          <UserPlus className="text-indigo-600 mx-auto mb-2" size={34} />
          <h2 className="text-2xl font-bold text-gray-800">
            Create your account
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Join the global helper network.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-gray-700 text-sm font-medium">
              Full Name
            </label>
            <div className="flex items-center border rounded-lg px-3 mt-1 bg-gray-50">
              <UserPlus className="text-gray-500" size={18} />
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none py-3 ml-2"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Email</label>
            <div className="flex items-center border rounded-lg px-3 mt-1 bg-gray-50">
              <Mail className="text-gray-500" size={18} />
              <input
                type="email"
                name="email"
                required
                placeholder="example@gmail.com"
                className="w-full bg-transparent outline-none py-3 ml-2"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 text-sm font-medium">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 mt-1 bg-gray-50">
              <Lock className="text-gray-500" size={18} />
              <input
                type="password"
                name="password"
                required
                placeholder="Minimum 6 characters"
                className="w-full bg-transparent outline-none py-3 ml-2"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
