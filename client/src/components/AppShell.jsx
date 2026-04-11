import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDefaultRouteForRole } from "../utils/roles";

export default function AppShell() {
  const { user, logout } = useAuth();
  const roleLinks = [
    { to: "/dashboard", label: "Overview" },
    { to: getDefaultRouteForRole(user?.role), label: `${user?.role} Panel` },
    { to: "/profile", label: "Profile" }
  ];

  return (
    <div className="shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">JWT Security Lab</p>
          <h1>Private access, backed by server verification.</h1>
          <p className="muted">
            Every protected view here depends on the token being checked by the
            Express API.
          </p>
        </div>

        <nav className="nav-links">
          {roleLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="profile-card">
          <p className="label">Signed in as</p>
          <strong>{user?.name}</strong>
          <span>{user?.email}</span>
          <span className="role-chip">{user?.role}</span>
          <button className="secondary-button" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
