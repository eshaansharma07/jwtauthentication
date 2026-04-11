import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { getAdminPanel, getModeratorPanel, getUserPanel } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const roleLoaders = {
  Admin: getAdminPanel,
  Moderator: getModeratorPanel,
  User: getUserPanel
};

export default function RoleDashboardPage({ role }) {
  const { token } = useAuth();
  const [panel, setPanel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPanel = async () => {
      try {
        const data = await roleLoaders[role]();
        setPanel(data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Could not load the role-based dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPanel();
  }, [role]);

  return (
    <section className="page-section">
      <p className="eyebrow">{role} dashboard</p>
      <h2>{loading ? "Loading dashboard..." : panel?.title}</h2>
      <p className="muted">
        {loading
          ? "Checking JWT permissions and loading role-specific tools."
          : panel?.summary}
      </p>

      {error ? (
        <Alert severity="error" sx={{ mt: 3, borderRadius: 3 }}>
          {error}
        </Alert>
      ) : null}

      {loading ? (
        <div className="dashboard-loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="stats-grid">
          {panel?.metrics?.map((metric) => (
            <article className="info-card" key={metric}>
              <span className="label">{role} access</span>
              <strong>{role}</strong>
              <p>{metric}</p>
            </article>
          ))}
        </div>
      )}

      <article className="token-card">
        <span className="label">Source token</span>
        <code>{token}</code>
      </article>
    </section>
  );
}
