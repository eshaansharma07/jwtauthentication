import { demoUser } from "../../server/src/data/user.js";
import { createToken } from "../../server/src/utils/jwt.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { email, password } = req.body || {};

  if (email !== demoUser.email || password !== demoUser.password) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = createToken({
    id: demoUser.id,
    email: demoUser.email,
    role: demoUser.role,
    name: demoUser.name
  });

  return res.status(200).json({
    token,
    user: {
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      role: demoUser.role
    }
  });
}
