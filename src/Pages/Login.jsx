// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Backend Login API  
    console.log("Logging in:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-blue-50 to-indigo-100 px-6">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">

        {/* Header */}
        <div className="text-center mb-6">
          <LogIn className="text-indigo-600 mx-auto mb-2" size={34} />
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Login to continue helping or getting help.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email Input */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Email</label>
            <div className="flex items-center border rounded-lg px-3 mt-1 bg-gray-50">
              <Mail className="text-gray-500" size={18} />
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                required
                className="w-full bg-transparent outline-none py-3 ml-2"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Password</label>
            <div className="flex items-center border rounded-lg px-3 mt-1 bg-gray-50">
              <Lock className="text-gray-500" size={18} />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full bg-transparent outline-none py-3 ml-2"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
