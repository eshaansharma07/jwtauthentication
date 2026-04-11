import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { getSecretMessage } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { getDefaultRouteForRole } from "../utils/roles";

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const data = await getSecretMessage();
        setOverview(data);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  return (
    <section className="page-section">
      <p className="eyebrow">Combined experiment</p>
      <h2>Login validation, JWT protection, and RBAC in one flow</h2>
      <p className="muted">
        This view combines the three experiments into one app: client-side form
        validation, protected route verification, and role-based access control.
      </p>

      <Alert severity="success" sx={{ mt: 3, borderRadius: 3 }}>
        Authenticated as {user?.role}. Your role-specific route is{" "}
        {getDefaultRouteForRole(user?.role)}.
      </Alert>

      <div className="stats-grid">
        <article className="info-card">
          <span className="label">CO2 focus</span>
          <strong>Responsive React UI</strong>
          <p>Interactive login, controlled inputs, and role-aware navigation.</p>
        </article>

        <article className="info-card">
          <span className="label">CO4 focus</span>
          <strong>Debug + secure flow</strong>
          <p>JWT validation, protected APIs, and feedback-driven auth states.</p>
        </article>

        <article className="info-card accent-card">
          <span className="label">RBAC state</span>
          <strong>{user?.role}</strong>
          <p>Frontend routes and API endpoints are both filtered by role.</p>
        </article>
      </div>

      <div className="stats-grid">
        <article className="info-card">
          <span className="label">Client validation</span>
          <strong>React Hook Form</strong>
          <p>Controlled login fields validate before the auth request runs.</p>
        </article>

        <article className="info-card">
          <span className="label">JWT verification</span>
          <strong>{loading ? "Checking..." : "Verified"}</strong>
          <p>{loading ? "Validating your token." : overview?.roleMessage}</p>
        </article>

        <article className="info-card accent-card">
          <span className="label">Protected feedback</span>
          <strong>{loading ? "Loading..." : overview?.message}</strong>
          <p>{loading ? "Fetching private data." : overview?.details}</p>
        </article>
      </div>

      <article className="token-card">
        <span className="label">Source token</span>
        <code>{token}</code>
      </article>
    </section>
  );
}
