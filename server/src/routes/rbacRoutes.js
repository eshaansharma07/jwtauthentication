import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/admin", verifyToken, authorizeRole("Admin"), (req, res) => {
  return res.json({
    title: "Admin dashboard",
    summary: "Manage users, platform settings, and elevated system actions.",
    metrics: [
      "User management controls enabled",
      "Permission matrix available",
      "Security audit logs protected by JWT verification"
    ]
  });
});

router.get(
  "/moderator",
  verifyToken,
  authorizeRole("Moderator"),
  (req, res) => {
    return res.json({
      title: "Moderator dashboard",
      summary: "Review reports, moderate activity, and enforce community rules.",
      metrics: [
        "Moderation queue protected",
        "Escalation tools available",
        "API access restricted by role hierarchy"
      ]
    });
  }
);

router.get("/user", verifyToken, authorizeRole("User"), (req, res) => {
  return res.json({
    title: "User dashboard",
    summary: "Access your personal workspace and account tools safely.",
    metrics: [
      "Protected personal area unlocked",
      "JWT token stored in localStorage",
      "Frontend and API guards both active"
    ]
  });
});

export default router;
