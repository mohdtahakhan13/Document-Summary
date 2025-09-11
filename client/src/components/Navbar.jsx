import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onChange = () => setNav(!nav);

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/check-auth",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => setLoggedIn(data.loggedIn))
      .catch((err) => console.error("Auth check failed:", err));
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/api/logout/", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setLoggedIn(false);
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-gray-900 to-black p-4 shadow-lg border-b border-gray-800/50 backdrop-blur-sm">
      <div className="container md:mx-auto sm:mx-[3vw] mx-[1.5vw] flex justify-between items-center">
      <h2 className="z-50 flex items-center gap-2">
  <Link to="/" className="no-underline flex items-center gap-2">
    {/* SVG Icon - Option 2 (Minimalist Document with AI) */}
    <motion.svg 
      width="40" 
      height="40" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="flex-shrink-0"
    >
      <rect width="32" height="32" rx="6" fill="#111827"/>
      <rect x="8" y="8" width="16" height="16" rx="2" fill="#10B981"/>
      <path d="M14 12H18V14H14V12Z" fill="#111827"/>
      <path d="M14 16H18V18H14V16Z" fill="#111827"/>
      <path d="M14 20H18V22H14V20Z" fill="#111827"/>
      <path d="M10 12H12V14H10V12Z" fill="#111827"/>
      <path d="M10 16H12V18H10V16Z" fill="#111827"/>
      <path d="M10 20H12V22H10V20Z" fill="#111827"/>
    </motion.svg>
    
    <motion.span
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.05,
        color: "#4ADE80",
        textShadow: "0px 0px 12px rgba(74, 222, 128, 0.7)",
      }}
      className="
        text-2xl font-bold cursor-pointer
        bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent
        transition duration-300
        hover:from-green-300 hover:to-green-400
      "
    >
      DocuMind AI
    </motion.span>
  </Link>
</h2>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium text-xl">
            Home
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium  text-xl">
            About
          </Link>
          {/* <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium">
            Contact
          </Link> */}
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-5 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-green-500/20"
            >
              Log out
            </button>
          ) : (
            <Link to="/signup">
              <button className="ml-4 px-5 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-md hover:shadow-green-500/30">
                Sign Up
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="z-50 cursor-pointer text-gray-300 md:hidden hover:text-green-400 transition-colors"
          onClick={onChange}
        >
          {nav ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: nav ? 1 : 0, y: nav ? 0 : -20 }}
          transition={{ duration: 0.3 }}
          className={
            nav
              ? "fixed z-40 top-0 left-0 bg-gradient-to-b from-gray-900 to-black w-full h-auto flex flex-col space-y-6 pt-20 md:hidden px-[6vw] pb-6 border-b border-gray-800/50 backdrop-blur-sm"
              : "fixed top-[-100%]"
          }
        >
          <Link 
            to="/" 
            className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium py-2"
            onClick={() => setNav(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium py-2"
            onClick={() => setNav(false)}
          >
            About
          </Link>
          {/* <Link 
            to="/contact" 
            className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium py-2"
            onClick={() => setNav(false)}
          >
            Contact
          </Link> */}
          {loggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setNav(false);
              }}
              className="w-[120px] px-5 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:from-green-700 hover:to-green-600 transition-all duration-300 mt-2"
            >
              Log out
            </button>
          ) : (
            <Link to="/signup" onClick={() => setNav(false)}>
              <button className="w-[120px] px-5 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transition-all duration-300 mt-2 shadow-md">
                Sign Up
              </button>
            </Link>
          )}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;