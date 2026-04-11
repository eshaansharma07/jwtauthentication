export const ROLE_LEVELS = {
  User: 1,
  Moderator: 2,
  Admin: 3
};

export const ROLE_HOME_ROUTES = {
  User: "/user",
  Moderator: "/moderator",
  Admin: "/admin"
};

export function hasRequiredRole(userRole, requiredRole) {
  return (ROLE_LEVELS[userRole] || 0) >= (ROLE_LEVELS[requiredRole] || 0);
}

export function getDefaultRouteForRole(role) {
  return ROLE_HOME_ROUTES[role] || "/user";
}
