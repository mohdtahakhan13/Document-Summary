import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const token = req.cookies.token;

  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
