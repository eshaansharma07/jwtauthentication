import { createToken } from "../../server/src/utils/jwt.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  const user = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: "Student"
  };

  const token = createToken(user);

  return res.status(201).json({
    token,
    user
  });
}
