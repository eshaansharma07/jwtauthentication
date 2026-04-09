import { useEffect, useState } from "react";
import { getSecretMessage } from "../api/auth";

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <p className="eyebrow">Dashboard</p>
      <h2>Private route unlocked</h2>
      <p className="muted">
        This page only renders after the token is validated and the API returns
        protected data.
      </p>

      <div className="stats-grid">
        <article className="info-card">
          <span className="label">Route status</span>
          <strong>Protected</strong>
          <p>React Router guard checked your session before rendering.</p>
        </article>

        <article className="info-card">
          <span className="label">Verification status</span>
          <strong>{loading ? "Checking..." : "Verified"}</strong>
          <p>Express middleware accepted the bearer token.</p>
        </article>

        <article className="info-card accent-card">
          <span className="label">Server message</span>
          <strong>{loading ? "Loading..." : overview?.message}</strong>
          <p>{loading ? "Fetching private data." : overview?.details}</p>
        </article>
      </div>
    </section>
  );
}
