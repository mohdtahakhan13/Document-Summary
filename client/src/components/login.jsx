import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://document-summary-server.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to login");
      setErr(false);

      const result = await res.json();
      console.log("Login successful:", result);
      navigate("/dashboard");
    } catch (error) {
      setErr(true);
      console.error("Error:", error);
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 flex justify-center items-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-green-400/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-6 h-6 bg-green-400/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/20 p-8 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden"
        style={{
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        }}
      >
        {/* Glassmorphism effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-black/10 backdrop-blur-md -z-10"></div>
        
        <div className="text-center mb-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2 font-poppins"
          >
            Welcome Back
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400"
          >
            Sign in to your DocuMind AI account
          </motion.p>
        </div>
        
        {err && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-900/30 border border-red-800/50 text-red-300 px-4 py-3 rounded-lg text-sm mb-4 text-center backdrop-blur-sm"
          >
            Invalid email or password
          </motion.div>
        )}

        <form
          className="flex flex-col gap-4 mb-5 relative z-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <input
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email"
                }
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/20 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/30 transition-all duration-300 backdrop-blur-sm"
            />
            {errors.email && (
              <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <input
              {...register("pass", {
                required: { value: true, message: "Password is required" },
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/20 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/30 transition-all duration-300 backdrop-blur-sm"
            />
            {errors.pass && (
              <span className="text-red-400 text-xs mt-1 block">{errors.pass.message}</span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg mt-2 relative overflow-hidden group ${
                isSubmitting
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 hover:shadow-green-500/40"
              }`}
            >
              <span className="relative z-10">
                {isSubmitting ? "Signing In..." : "Sign In"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center my-6 relative z-10"
        >
          <hr className="flex-1 border-gray-700/30" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-700/30" />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 text-sm text-center relative z-10"
        >
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:text-green-300 transition-colors font-medium">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;