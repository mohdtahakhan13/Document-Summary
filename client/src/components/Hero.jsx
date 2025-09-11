import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";

const Hero = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    fetch(
      "https://document-summary-server.onrender.com/api/check-auth",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Auth check response:", data);
        setLoggedIn(data.loggedIn);
      })
      .catch((err) => console.error("Auth check failed:", err));
  }, []);

  return (
    <>
    <section className="w-full h-[90vh] flex justify-center items-center px-6 bg-gradient-to-br from-gray-900 via-black to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-black/70 to-gray-950/80 opacity-90" />

      <div className="relative text-center max-w-3xl z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight font-poppins"
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent drop-shadow-sm">DocuMind AI</span>
        </motion.h1>

       <motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3 }}
  className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
>
  Unlock insights with{" "}
  <span className="font-semibold text-green-400">DocuMind AI</span> — quickly{" "}
  <span className="font-semibold text-white">summarize documents, PDFs, and images</span>{" "}
  or{" "}
  <span className="font-semibold text-green-400">ask direct questions</span> to get{" "}
  <span className="font-semibold text-white">instant answers</span>. Choose from{" "}
  <span className="font-semibold text-green-400">short, medium, or detailed summaries</span>{" "}
  and focus only on what truly matters.
</motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to={loggedIn ? "/dashboard" : "/signup"}>
            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-green-500 hover:to-green-400 hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1">
              {loggedIn ? "Go to Dashboard" : "Get Started"}
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-green-400/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-6 h-6 bg-green-400/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
      <Footer />
      </>
  );
};

export default Hero;