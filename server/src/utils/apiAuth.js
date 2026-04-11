import { getBearerToken, verifyJwtToken } from "./jwt.js";
import { hasRequiredRole } from "./roles.js";

export function getAuthorizedUser(req) {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    return {
      error: { status: 401, message: "Access denied. Token missing." }
    };
  }

  try {
    return { user: verifyJwtToken(token) };
  } catch (error) {
    return {
      error: { status: 401, message: "Invalid or expired token." }
    };
  }
}

export function requireRole(req, requiredRole) {
  const authResult = getAuthorizedUser(req);

  if (authResult.error) {
    return authResult;
  }

  if (!hasRequiredRole(authResult.user.role, requiredRole)) {
    return {
      error: {
        status: 403,
        message: `This area requires ${requiredRole} access.`
      }
    };
  }

  return authResult;
}
