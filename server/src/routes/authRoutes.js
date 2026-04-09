import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRY } from "../config.js";
import { demoUser } from "../data/user.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== demoUser.email || password !== demoUser.password) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign(
    {
      id: demoUser.id,
      email: demoUser.email,
      role: demoUser.role,
      name: demoUser.name
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

  return res.json({
    token,
    user: {
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      role: demoUser.role
    }
  });
});

router.get("/me", verifyToken, (req, res) => {
  return res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

export default router;
