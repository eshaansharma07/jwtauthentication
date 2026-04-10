import { getBearerToken, verifyJwtToken } from "../../server/src/utils/jwt.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    const user = verifyJwtToken(token);
    const roleMessage = {
      Admin: "You can review platform-wide controls and elevated actions.",
      Moderator: "You can review flagged activity and keep the space healthy.",
      User: "You can access your personal protected workspace."
    };

    return res.status(200).json({
      message: "JWT accepted",
      details: `Welcome ${user.name}. Your private route is protected on both client and server.`,
      role: user.role,
      roleMessage: roleMessage[user.role] || roleMessage.User
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
