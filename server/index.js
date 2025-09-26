import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import signupRoutes from "./routes/signup.js";
import logoutRoutes from "./routes/logout.js";
import loginRoutes from "./routes/login.js";
import authRouter from "./routes/authRouter.js";
import dashboard from "./routes/dashboard.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

app.use(
  cors({
    origin: [
      process.env.ORIGIN, 
      "https://document-summary-one.vercel.app",
      "http://localhost:5173/",
    ], 
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/signup", signupRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboard);

// Auth check route
app.get("/api/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ loggedIn: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ loggedIn: true });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
