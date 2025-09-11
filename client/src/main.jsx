// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import About from "./components/about.jsx";
import NotFound from "./components/notFound.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<App />} />

        {/* Auth Pages */}
        <Route
          path="/signup"
          element={
            <GoogleOAuthProvider clientId={clientId}>
              <Signup />
            </GoogleOAuthProvider>
          }
        />
        <Route
          path="/login"
          element={
            <GoogleOAuthProvider clientId={clientId}>
              <Login />
            </GoogleOAuthProvider>
          }
        />

        {/* Other Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
