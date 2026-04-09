import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRY } from "../config.js";

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyJwtToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function getBearerToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
}
