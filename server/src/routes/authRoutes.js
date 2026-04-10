import express from "express";
import { findDemoUser } from "../data/user.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const demoUser = findDemoUser(email, password);

  if (!demoUser) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = createToken({
    id: demoUser.id,
    email: demoUser.email,
    role: demoUser.role,
    name: demoUser.name
  });

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
