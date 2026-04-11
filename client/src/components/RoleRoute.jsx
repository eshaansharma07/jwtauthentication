import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDefaultRouteForRole } from "../utils/roles";

const roleHierarchy = {
  User: 1,
  Moderator: 2,
  Admin: 3
};

export default function RoleRoute({ requiredRole, children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if ((roleHierarchy[user.role] || 0) < (roleHierarchy[requiredRole] || 0)) {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  return children;
}
