import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/auth/AuthSlice.jsx";
import {
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  Sparkles,
  Users,
  Rocket,
  Shield,
  Globe,
} from "lucide-react";
/* eslint-disable no-unused-vars -- motion is used in JSX */
import { motion, AnimatePresence } from "framer-motion";
import { BACKEND_URL } from "../../config/env.js";
import { useLocation } from "react-router-dom";

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = `hsl(${Math.random() * 60 + 210}, 70%, 60%)`;
    this.alpha = Math.random() * 0.6 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > this.canvas.width) this.x = 0;
    else if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    else if (this.y < 0) this.y = this.canvas.height;
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const location = useLocation();
  const roleFromQuery = new URLSearchParams(location.search).get("role");
  const role = roleFromQuery || "patient"; // default fallback

  const features = [
    {
      icon: Users,
      title: "Connect with Verified Doctors",
      description:
        "Schedule video calls, chat, and follow up with trusted medical professionals worldwide.",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Rocket,
      title: "Track Your Health Progress",
      description:
        "Monitor fitness, sleep, diet, and chronic condition metrics, all in one app.",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "End-to-end encryption for personal health records, lab results, and consultations.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Global Health Platform",
      description:
        "Access health support anytime, anywhere, with wearable & telemedicine integration.",
      color: "from-orange-400 to-red-500",
    },
  ];

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Feature carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Clear error/success after timeout
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/login`,
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(setUser(res.data.user));
      if (role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again.",
      );
      setForm((prev) => ({ ...prev, password: "" }));
    } finally {
      setIsLoading(false);
    }
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };
  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, rotateX: 10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, delay: 0.2 },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400 },
    },
  };
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" },
    tap: { scale: 0.95 },
    loading: { scale: 0.98 },
  };
  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)",
      transition: { type: "spring", stiffness: 400 },
    },
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-linear-to-r from-slate-50 via-blue-50 to-indigo-100 px-4 sm:px-6 overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-500"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Features */}
        <motion.div
          className="hidden lg:flex flex-col justify-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex items-center gap-3 mb-8"
            variants={itemVariants}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-indigo-600" size={32} />
            </motion.div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent">
              SwasthaySewa
            </h1>
          </motion.div>

          <div className="relative h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-linear-to-r ${features[currentFeature].color} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {React.createElement(features[currentFeature].icon, {
                    className: "text-white",
                    size: 28,
                  })}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {features[currentFeature].title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {features[currentFeature].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          className="flex justify-center lg:justify-end"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="w-full max-w-md"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20"
              whileHover={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
            >
              <motion.div className="text-center mb-8" variants={itemVariants}>
                <motion.div
                  className="w-20 h-20 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <LogIn className="text-white" size={32} />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {role === "doctor" ? "Doctor Login" : "Patient Login"}
                </h2>
                <p className="text-xs text-gray-500 mt-2">
                  Not a {role}?{" "}
                  <Link
                    to={`/login?role=${role === "doctor" ? "patient" : "doctor"}`}
                    className="text-indigo-600 font-semibold"
                  >
                    Switch to {role === "doctor" ? "Patient" : "Doctor"} Login
                  </Link>
                </p>

                <p className="text-gray-600 text-sm">
                  Sign in as a{" "}
                  <span className="font-semibold text-indigo-600 capitalize">
                    {role}
                  </span>
                </p>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label className="text-gray-700 font-medium text-sm mb-2 block">
                    Email Address
                  </label>
                  <motion.div
                    className="flex items-center border border-gray-300 rounded-xl px-4 bg-white/50 backdrop-blur-sm transition-all duration-200"
                    variants={inputVariants}
                  >
                    <Mail className="text-gray-500" size={20} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      value={form.email}
                      className="w-full bg-transparent outline-none py-4 px-3 text-gray-700 placeholder-gray-500"
                      onChange={handleChange}
                    />
                  </motion.div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="text-gray-700 font-medium text-sm mb-2 block">
                    Password
                  </label>
                  <motion.div
                    className="flex items-center border border-gray-300 rounded-xl px-4 bg-white/50 backdrop-blur-sm transition-all duration-200"
                    variants={inputVariants}
                  >
                    <Lock className="text-gray-500" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      required
                      value={form.password}
                      className="w-full bg-transparent outline-none py-4 px-3 text-gray-700 placeholder-gray-500"
                      onChange={handleChange}
                    />
                    <motion.button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => setShowPassword((prev) => !prev)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </motion.button>
                  </motion.div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="loading"
                    whileTap="tap"
                  >
                    <div className="relative hover:cursor-pointer z-10 flex items-center justify-center gap-3">
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <LogIn size={20} />
                      )}
                      {isLoading ? "Logging In..." : "Log In"}
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.form>

              {/* Footer */}
              <motion.div
                className="text-center mt-8 pt-6 border-t border-gray-200/50"
                variants={itemVariants}
              >
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-block"
                  >
                    <Link
                      to={`/register?role=${role}`}
                      className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors relative"
                    >
                      <span className="relative">
                        Create Account
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        />
                      </span>
                    </Link>
                  </motion.span>
                </p>
              </motion.div>

              {/* Mobile Feature Indicators */}
              <motion.div
                className="lg:hidden flex justify-center mt-6 space-x-2"
                variants={itemVariants}
              >
                {features.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentFeature
                        ? "bg-indigo-600 w-6"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentFeature(index)}
                    aria-label={`Show feature ${index + 1}`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-20 left-20 w-3 h-3 bg-indigo-400 rounded-full opacity-60 hidden lg:block"
        animate={{ y: [0, -30, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-32 right-32 w-4 h-4 bg-purple-400 rounded-full opacity-40 hidden lg:block"
        animate={{ y: [0, 20, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
