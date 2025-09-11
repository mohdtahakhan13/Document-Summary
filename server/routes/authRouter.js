import express from "express";
import googleLogin from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Auth route is working" });
});

router.get("/google", googleLogin);
export default router;
