import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import RoleDashboardPage from "./pages/RoleDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./context/AuthContext";

function HomeRedirect() {
  const { isAuthenticated, defaultRoute } = useAuth();
  return <Navigate to={isAuthenticated ? defaultRoute : "/login"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/admin"
          element={
            <RoleRoute requiredRole="Admin">
              <RoleDashboardPage role="Admin" />
            </RoleRoute>
          }
        />
        <Route
          path="/moderator"
          element={
            <RoleRoute requiredRole="Moderator">
              <RoleDashboardPage role="Moderator" />
            </RoleRoute>
          }
        />
        <Route
          path="/user"
          element={
            <RoleRoute requiredRole="User">
              <RoleDashboardPage role="User" />
            </RoleRoute>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
