import { requireRole } from "../../server/src/utils/apiAuth.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const authResult = requireRole(req, "Moderator");

  if (authResult.error) {
    return res
      .status(authResult.error.status)
      .json({ message: authResult.error.message });
  }

  return res.status(200).json({
    title: "Moderator dashboard",
    summary: "Review reports, moderate activity, and enforce community rules.",
    metrics: [
      "Moderation queue protected",
      "Escalation tools available",
      "API access restricted by role hierarchy"
    ]
  });
}
