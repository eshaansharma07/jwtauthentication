import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AppShell() {
  const { user, logout } = useAuth();

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
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>

        <div className="profile-card">
          <p className="label">Signed in as</p>
          <strong>{user?.name}</strong>
          <span>{user?.email}</span>
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
