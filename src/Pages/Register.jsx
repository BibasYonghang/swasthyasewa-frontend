// src/pages/Register.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserPlus,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle,
  Users,
  Rocket,
  Shield,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const features = [
    {
      icon: Users,
      title: "Join Our Community",
      description:
        "Connect with thousands of helpers and problem-solvers worldwide",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Rocket,
      title: "Instant Access",
      description: "Start getting help and providing assistance immediately",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access help anytime, anywhere across the globe",
      color: "from-orange-400 to-red-500",
    },
  ];

  // Password strength calculator
  useEffect(() => {
    const strength = calculatePasswordStrength(form.password);
    setPasswordStrength(strength);
  }, [form.password]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;

    class Particle {
      constructor() {
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

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:3000/api/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess("🎉 Account created successfully! Welcome to our community!");
      setForm({ name: "", email: "", password: "" });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      if (message.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: message }));
      } else if (message.toLowerCase().includes("password")) {
        setErrors((prev) => ({ ...prev, password: message }));
      } else if (message.toLowerCase().includes("name")) {
        setErrors((prev) => ({ ...prev, name: message }));
      } else {
        setErrors((prev) => ({ ...prev, general: message }));
      }

      setForm((prev) => ({ ...prev, password: "" }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errors.general || errors.name || errors.email || errors.password) {
      const timer = setTimeout(() => {
        setErrors({ name: "", email: "", password: "", general: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, rotateX: 10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
    },
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

  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: `${passwordStrength}%`,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 px-4 sm:px-6 overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-500"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Features */}
        <motion.div
          className="hidden lg:flex flex-col justify-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent">
              Neighborly
            </h1>
          </motion.div>

          {/* Feature Carousel */}
          <div className="relative h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${features[currentFeature].color} flex items-center justify-center mb-6 shadow-lg`}
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

          {/* Benefits List */}
          <motion.div className="space-y-4 mt-8" variants={itemVariants}>
            {[
              "Instant access to global helper network",
              "24/7 real-time assistance",
              "Secure and private communication",
              "Multi-platform support",
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-gray-700"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <CheckCircle
                  className="text-green-500 flex-shrink-0"
                  size={20}
                />
                <span className="text-sm">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Register Form */}
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
              className="bg-white/40 backdrop-blur-xl my-5 p-8 rounded-3xl shadow-2xl border border-white/20"
              whileHover={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
            >
              {/* Header */}
              <motion.div className="text-center mb-4" variants={itemVariants}>
                <motion.div
                  className="w-15 h-15 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <UserPlus className="text-white" size={22} />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Join Our Community
                </h2>
                <p className="text-gray-600 text-lg">
                  Start your journey with us today
                </p>
              </motion.div>

              {/* Messages */}
              <AnimatePresence>
                {errors.general && (
                  <motion.div
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errors.general}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={containerVariants}
              >
                {/* Name Field */}
                <motion.div variants={itemVariants}>
                  <label className="text-gray-700 font-medium text-sm mb-2 block">
                    Full Name
                  </label>
                  <motion.div
                    className="flex items-center border border-gray-300 rounded-xl px-4 bg-white/50 backdrop-blur-sm transition-all duration-200"
                    whileFocus="focus"
                    variants={inputVariants}
                  >
                    <UserPlus className="text-gray-500" size={20} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      value={form.name}
                      className="w-full bg-transparent outline-none py-4 px-3 text-gray-700 placeholder-gray-500"
                      onChange={handleChange}
                    />
                  </motion.div>
                  {errors.name && (
                    <motion.p
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <label className="text-gray-700 font-medium text-sm mb-2 block">
                    Email Address
                  </label>
                  <motion.div
                    className="flex items-center border border-gray-300 rounded-xl px-4 bg-white/50 backdrop-blur-sm transition-all duration-200"
                    whileFocus="focus"
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
                  {errors.email && (
                    <motion.p
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <label className="text-gray-700 font-medium text-sm mb-2 block">
                    Password
                  </label>
                  <motion.div
                    className="flex items-center border border-gray-300 rounded-xl px-4 bg-white/50 backdrop-blur-sm transition-all duration-200"
                    whileFocus="focus"
                    variants={inputVariants}
                  >
                    <Lock className="text-gray-500" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a strong password"
                      required
                      value={form.password}
                      className="w-full bg-transparent outline-none py-4 px-3 text-gray-700 placeholder-gray-500"
                      onChange={handleChange}
                    />
                    <motion.button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => setShowPassword((s) => !s)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </motion.button>
                  </motion.div>

                  {/* Password Strength Indicator */}
                  {form.password && (
                    <motion.div
                      className="mt-3 space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Password strength</span>
                        <span>{passwordStrength}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${getPasswordStrengthColor(
                            passwordStrength
                          )}`}
                          variants={progressVariants}
                          initial="initial"
                          animate="animate"
                        />
                      </div>
                    </motion.div>
                  )}

                  {errors.password && (
                    <motion.p
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover={isLoading ? "loading" : "hover"}
                    whileTap="tap"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3">
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
                        <UserPlus size={20} />
                      )}
                      {isLoading ? "Creating Account..." : "Create Account"}
                      {!isLoading && (
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Button Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
                  Already have an account?{" "}
                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      to="/login"
                      className="text-purple-600 font-semibold hover:text-purple-700 transition-colors relative"
                    >
                      <span className="relative">
                        Sign In
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        />
                      </span>
                    </Link>
                  </motion.div>
                </p>
              </motion.div>
            </motion.div>

            {/* Mobile Feature Indicator */}
            <motion.div
              className="lg:hidden flex justify-center mt-6 space-x-2"
              variants={itemVariants}
            >
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentFeature
                      ? "bg-purple-600 w-6"
                      : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentFeature(index)}
                  type="button"
                  aria-label={`Show feature ${index + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-3 h-3 bg-purple-400 rounded-full opacity-60 hidden lg:block"
        animate={{
          y: [0, -30, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-4 h-4 bg-pink-400 rounded-full opacity-40 hidden lg:block"
        animate={{
          y: [0, 20, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
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
