export const roleHomeRoutes = {
  Admin: "/admin",
  Moderator: "/moderator",
  User: "/user"
};

export function getDefaultRouteForRole(role) {
  return roleHomeRoutes[role] || "/user";
}
