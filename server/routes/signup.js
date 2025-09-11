import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const created = await User.create({
      email,
      password: hash,
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { email: created.email, id: created._id },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
