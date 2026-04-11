import { requireRole } from "../../server/src/utils/apiAuth.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const authResult = requireRole(req, "Admin");

  if (authResult.error) {
    return res
      .status(authResult.error.status)
      .json({ message: authResult.error.message });
  }

  return res.status(200).json({
    title: "Admin dashboard",
    summary: "Manage users, platform settings, and elevated system actions.",
    metrics: [
      "User management controls enabled",
      "Permission matrix available",
      "Security audit logs protected by JWT verification"
    ]
  });
}
