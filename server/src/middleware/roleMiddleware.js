import { hasRequiredRole } from "../utils/roles.js";

export function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user || !hasRequiredRole(req.user.role, requiredRole)) {
      return res
        .status(403)
        .json({ message: `This area requires ${requiredRole} access.` });
    }

    next();
  };
}
