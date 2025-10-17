import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

const generateToken = (userId, res) => {
  const { JWT_SECRET, NODE_ENV } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true,                   // prevent XSS
    secure: NODE_ENV === "production",// send cookie only over HTTPS in prod
    sameSite: NODE_ENV === "production" ? "none" : "lax", // allow cross-origin in prod
  });

  return token;
};

export default generateToken;
