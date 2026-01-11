import React, { useEffect, useRef } from "react";
import { Sparkles, ArrowRight, Zap, Users, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
/* eslint-disable no-unused-vars -- motion is used in JSX */
import { motion } from "framer-motion";

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = `hsl(${Math.random() * 60 + 210}, 70%, 60%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > window.innerWidth) this.x = 0;
    else if (this.x < 0) this.x = window.innerWidth;
    if (this.y > window.innerHeight) this.y = 0;
    else if (this.y < 0) this.y = window.innerHeight;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function WelcomePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Responsive canvas scaling
    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();

    const particles = [];
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    function drawParticles() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      requestAnimationFrame(drawParticles);
    }

    drawParticles();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.18 },
    },
  };
  const itemVariants = {
    hidden: { y: 22, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 110 },
    },
  };
  const cardVariants = {
    hidden: { scale: 0.98, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 110, delay: 0.4 },
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: { type: "spring", stiffness: 300 },
    },
  };
  const buttonVariants = {
    hover: { scale: 1.04, transition: { type: "spring", stiffness: 400 } },
    tap: { scale: 0.95 },
  };
  const featureVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90 },
    },
  };

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-100 p-3 md:p-6 overflow-x-hidden overflow-y-auto"
      style={{ minHeight: "100dvh" }}
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none w-full h-full"
        style={{
          opacity: 0.5,
          width: "100vw",
          height: "100vh",
          minHeight: "100dvh",
        }}
        aria-hidden="true"
      />

      {/* Gradient Orbs */}
      <div className="absolute top-[10%] left-[2%] sm:top-1/4 sm:left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl sm:blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-[10%] right-[2%] sm:bottom-1/4 sm:right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl sm:blur-xl opacity-20 animate-pulse delay-1000" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full flex flex-col md:flex-row md:justify-center md:items-stretch gap-10 max-w-screen-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side */}
        <div className="md:flex-1 md:min-w-[20rem] md:pr-4 flex flex-col justify-center">
          <motion.div
            className="text-center mb-10 md:mb-16"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center justify-center gap-2 md:gap-3 mb-5 md:mb-6"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-indigo-600" size={32} />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent select-none">
                SwasthyaSewa
              </h1>
            </motion.div>
            <motion.p
              className="text-gray-600 max-w-lg xs:max-w-xl sm:max-w-2xl mx-auto text-base xs:text-lg md:text-xl leading-relaxed"
              variants={itemVariants}
            >
              <span className="block text-indigo-600 font-semibold mt-2">
                Stay healthy, stay informed, and connect with experts worldwide.
              </span>
            </motion.p>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 mb-10 md:mb-12"
            variants={containerVariants}
          >
            {[
              {
                icon: Zap,
                text: "Instant Health Reports",
                color: "text-yellow-500",
              },
              {
                icon: Users,
                text: "Global Doctor Network",
                color: "text-green-500",
              },
              {
                icon: Shield,
                text: "Secure & Private Data",
                color: "text-blue-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-200/50 text-center flex flex-col items-center"
                variants={featureVariants}
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon
                  className={`mx-auto mb-2 ${feature.color}`}
                  size={24}
                />
                <p className="text-xs sm:text-sm font-medium text-gray-700">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust info */}
          <motion.div
            className="text-center mt-8 md:mt-12"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Globe size={16} className="text-indigo-600" />
              <p className="text-gray-600 text-xs md:text-sm font-medium">
                Trusted by users worldwide
              </p>
            </div>
            <p className="text-gray-500 text-xs md:text-sm">
              Powered by advanced health tech • Designed for real wellness
              solutions
            </p>
          </motion.div>
        </div>

        {/* Right Side Card */}
        <motion.div
          className="bg-white/90 backdrop-blur-lg p-4 xs:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 mx-auto w-full max-w-[22rem] xs:max-w-md lg:max-w-md md:self-center flex flex-col justify-between"
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.div
            className="text-center mb-5 md:mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="text-white" size={22} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Welcome 👋
            </h2>
            <p className="text-gray-600 mt-2 leading-relaxed text-sm md:text-base">
              Join millions of users taking control of their health, getting
              accurate assessments, and connecting with certified doctors
              instantly.
            </p>
          </motion.div>

          <div className="space-y-3 md:space-y-4">
            <motion.div variants={buttonVariants} whileTap="tap">
              <Link
                to="/login"
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 md:py-4 rounded-xl text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg"
              >
                Sign In to Your Account
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} whileTap="tap">
              <Link
                to="/register"
                className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-3 md:py-4 rounded-xl text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1 md:gap-3 group text-base md:text-lg"
              >
                Register Your Account
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.3, repeat: Infinity }}
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
            className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200/50 text-center"
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

      {/* Floating dots */}
      <motion.div
        className="absolute bottom-5 left-5 md:bottom-10 md:left-10 w-3 h-3 md:w-4 md:h-4 bg-indigo-400 rounded-full opacity-60"
        animate={{ y: [0, -14, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-5 right-5 md:top-10 md:right-10 w-4 h-4 md:w-6 md:h-6 bg-purple-400 rounded-full opacity-40"
        animate={{ y: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
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
