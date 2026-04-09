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

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
