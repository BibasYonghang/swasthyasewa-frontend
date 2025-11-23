// src/pages/WelcomePage.jsx
import React, { useEffect, useRef } from "react";
import { Sparkles, ArrowRight, Zap, Users, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `hsl(${Math.random() * 60 + 210}, 70%, 60%)`;
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
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
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
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-100 p-6 overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

      <motion.div
        className="relative flex justify-center items-center  z-10 w-full "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          {/* Header Section */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.div
              className="flex items-center justify-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-indigo-600" size={40} />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent">
                Neighborly
              </h1>
            </motion.div>

            <motion.p
              className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
              variants={itemVariants}
            >
              Instant AI-powered assistance for your everyday challenges.
              <span className="block text-indigo-600 font-semibold mt-2">
                Smarter solutions, faster responses.
              </span>
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {[
              { icon: Zap, text: "Lightning Fast", color: "text-yellow-500" },
              { icon: Users, text: "Global Network", color: "text-green-500" },
              {
                icon: Shield,
                text: "Secure & Private",
                color: "text-blue-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 text-center"
                variants={featureVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon
                  className={`mx-auto mb-2 ${feature.color}`}
                  size={24}
                />
                <p className="text-sm font-medium text-gray-700">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-12" variants={itemVariants}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Globe size={16} className="text-indigo-600" />
              <p className="text-gray-600 text-sm font-medium">
                Trusted by users worldwide
              </p>
            </div>
            <p className="text-gray-500 text-sm">
              Powered by Advanced AI • Designed for Real Solutions
            </p>
          </motion.div>
        </div>
        {/* Main Card */}
        <motion.div
          className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 mx-auto max-w-md"
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.div
            className="text-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome 👋</h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Join millions of users getting instant help from our global
              community of experts and AI assistants.
            </p>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/login"
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign In to Your Account
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/register"
                className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-4 rounded-xl text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                Register Your Account
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.div>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="mt-6 pt-6 border-t border-gray-200/50 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-10 left-10 w-4 h-4 bg-indigo-400 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-10 right-10 w-6 h-6 bg-purple-400 rounded-full opacity-40"
        animate={{
          y: [0, 15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
