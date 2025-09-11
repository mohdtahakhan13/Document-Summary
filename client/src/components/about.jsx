import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaFileAlt, FaRocket, FaGlobe } from "react-icons/fa";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-200 flex flex-col">
        <section className="flex-1 w-full flex flex-col items-center justify-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white font-poppins">
              About <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">DocuMind AI</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              <span className="font-semibold text-white">DocuMind AI</span> is your
              intelligent document assistant that transforms{" "}
              <span className="font-semibold text-green-400">
                lengthy documents, PDFs, and images
              </span>{" "}
              into concise, meaningful insights. Designed for students, professionals, 
              and researchers, DocuMind helps you extract{" "}
              <span className="font-semibold text-white">key information quickly</span>{" "}
              without getting lost in pages of text.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {/* Feature Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2), 0 8px 10px -6px rgba(16, 185, 129, 0.2)"
                }}
                className="relative bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30 overflow-hidden group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex justify-center mb-4 relative z-10">
                  <motion.div 
                    className="p-3 rounded-full bg-green-900/30 border border-green-700/30 group-hover:bg-green-900/50 group-hover:border-green-500/50 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <FaFileAlt className="text-green-400 text-xl group-hover:text-green-300 transition-colors duration-300" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-3 relative z-10 group-hover:text-green-300 transition-colors duration-300">
                  Smart Document Processing
                </h3>
                <p className="text-gray-300 text-sm relative z-10">
                  Extract key ideas and generate summaries of any length with our advanced AI algorithms.
                </p>
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2), 0 8px 10px -6px rgba(16, 185, 129, 0.2)"
                }}
                className="relative bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30 overflow-hidden group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex justify-center mb-4 relative z-10">
                  <motion.div 
                    className="p-3 rounded-full bg-green-900/30 border border-green-700/30 group-hover:bg-green-900/50 group-hover:border-green-500/50 transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaRocket className="text-green-400 text-xl group-hover:text-green-300 transition-colors duration-300" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-3 relative z-10 group-hover:text-green-300 transition-colors duration-300">
                  Fast & Precise
                </h3>
                <p className="text-gray-300 text-sm relative z-10">
                  Powered by cutting-edge AI and OCR technology for accurate results from any document type.
                </p>
              </motion.div>

              {/* Feature Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2), 0 8px 10px -6px rgba(16, 185, 129, 0.2)"
                }}
                className="relative bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30 overflow-hidden group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex justify-center mb-4 relative z-10">
                  <motion.div 
                    className="p-3 rounded-full bg-green-900/30 border border-green-700/30 group-hover:bg-green-900/50 group-hover:border-green-500/50 transition-colors duration-300"
                    whileHover={{ 
                      scale: [1, 1.1, 1],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <FaGlobe className="text-green-400 text-xl group-hover:text-green-300 transition-colors duration-300" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-3 relative z-10 group-hover:text-green-300 transition-colors duration-300">
                  Universal Compatibility
                </h3>
                <p className="text-gray-300 text-sm relative z-10">
                  Works seamlessly across file formats and languages, making it your essential productivity tool.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Footer with Contact Information */}
        <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800/50 py-10 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Connect With Us</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Have questions, feedback, or collaboration ideas? We'd love to hear from you!
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
              <motion.a
                href="mailto:mohdtahakhan13@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex flex-col items-center"
              >
                <div className="p-3 rounded-full bg-gray-800/50 border border-gray-700/50 mb-3">
                  <FaEnvelope className="text-green-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                <p className="text-gray-400 text-sm">mohdtahakhan13@gmail.com</p>
              </motion.a>

              <motion.a
                href="https://github.com/mohdtahakhan13"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex flex-col items-center"
              >
                <div className="p-3 rounded-full bg-gray-800/50 border border-gray-700/50 mb-3">
                  <FaGithub className="text-green-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">GitHub</h3>
                <p className="text-gray-400 text-sm">github.com/mohdtahakhan13</p>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/mohd-taha-khan-b76656317/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex flex-col items-center"
              >
                <div className="p-3 rounded-full bg-gray-800/50 border border-gray-700/50 mb-3">
                  <FaLinkedin className="text-green-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">LinkedIn</h3>
                <p className="text-gray-400 text-sm">linkedin.com/in/mohd-taha-khan-b76656317/</p>
              </motion.a>
            </div>

            <div className="border-t border-gray-800/50 pt-6">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} DocuMind AI. All rights reserved.
              </p>
            </div>
          </motion.div>
        </footer>
      </div>
    </>
  );
};

export default About;