import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-200 flex flex-col justify-center items-center px-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent drop-shadow-lg font-poppins"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg md:text-2xl text-gray-300 mt-4 text-center max-w-2xl"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8"
      >
        <Link to="/">
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-500 hover:to-green-400 hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1">
            ← Back to Home
          </button>
        </Link>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-green-400/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-6 h-6 bg-green-400/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default NotFound;