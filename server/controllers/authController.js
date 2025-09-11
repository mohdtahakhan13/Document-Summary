import oauth2Client from "../utils/googleconfig.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    const userRes = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const { email, name } = await userRes.json();
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "Google authentication successful",
      token,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Google authentication failed",
      details: error.message,
    });
  }
};

export default googleLogin;
