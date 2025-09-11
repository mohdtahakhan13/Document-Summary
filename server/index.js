// import express from "express";
// const app = express();

// import dotenv from "dotenv";
// dotenv.config();
// import signupRoutes from "./routes/signup.js";
// import logoutRoutes from "./routes/logout.js";
// import loginRoutes from "./routes/login.js";
// import authRouter from "./routes/authRouter.js";
// import dashboard from "./routes/dashboard.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import jwt from "jsonwebtoken";
// import path from "path";

// const __dirname = path.resolve();

// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookieParser());
// app.use("/api/signup", signupRoutes);
// app.use("/api/logout", logoutRoutes);
// app.use("/api/login", loginRoutes);
// app.use("/api/auth", authRouter);
// app.use("/api/dashboard", dashboard);

// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("/api/check-auth", (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ loggedIn: false });
//   }

//   try {
//     const email = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ loggedIn: true });
//   } catch (err) {
//     res.json({ loggedIn: false });
//   }
// });

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
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
      "https://document-summary-one.vercel.app"
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
