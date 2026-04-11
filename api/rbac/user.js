import { requireRole } from "../../server/src/utils/apiAuth.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const authResult = requireRole(req, "User");

  if (authResult.error) {
    return res
      .status(authResult.error.status)
      .json({ message: authResult.error.message });
  }

  return res.status(200).json({
    title: "User dashboard",
    summary: "Access your personal workspace and account tools safely.",
    metrics: [
      "Protected personal area unlocked",
      "JWT token stored in localStorage",
      "Frontend and API guards both active"
    ]
  });
}
