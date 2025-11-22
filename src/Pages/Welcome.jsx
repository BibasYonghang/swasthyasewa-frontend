// src/pages/WelcomePage.jsx
import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center from-blue-50 to-indigo-100 px-6">
      {/* Logo + Title */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles
            className="text-indigo-600"
            size={window.innerWidth > 800 ? 32 : 25}
          />
          <h1 className="sm:text-3xl text-2xl font-bold text-gray-800">
            Real-Time Life Assistant
          </h1>
        </div>

        <p className="text-gray-600 max-w-md text-lg">
          Ask anything, get help instantly – anytime, anywhere.
        </p>
      </div>

      {/* Main Card */}
      <div className=" bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Welcome 👋
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Join the global network of helpers & problem-solvers.
        </p>

        <div className="mt-8 space-y-4">
          <Link
            to="/login"
            className="block w-full bg-indigo-600 text-white py-3 rounded-lg text-center font-medium shadow hover:bg-indigo-700 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className=" w-full bg-gray-900 text-white py-3 rounded-lg text-center font-medium shadow hover:bg-black transition flex items-center justify-center gap-2"
          >
            Create Account
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-center text-sm mt-8">
        Powered by AI • Designed for instant help & real solutions
      </p>
    </div>
  );
}
