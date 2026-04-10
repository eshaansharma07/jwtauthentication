import { useEffect, useState } from "react";
import { getSecretMessage } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  const dashboardConfig = {
    Admin: {
      title: "Admin control dashboard",
      summary: "Monitor platform health, elevated access, and system-wide decisions.",
      cards: [
        { label: "Privilege scope", value: "Full access", text: "Review protected admin capabilities and sensitive controls." },
        { label: "Audit queue", value: "12 items", text: "Investigate events that need administrative review." },
        { label: "System status", value: "Healthy", text: "Critical services and token verification are operating normally." }
      ]
    },
    Moderator: {
      title: "Moderator operations dashboard",
      summary: "Handle flagged content, community actions, and session moderation tools.",
      cards: [
        { label: "Flagged reports", value: "8 open", text: "Respond to moderation alerts that require attention." },
        { label: "Review tools", value: "Enabled", text: "Access tools that help keep protected spaces safe." },
        { label: "Response time", value: "Fast", text: "JWT verification keeps moderation routes protected and responsive." }
      ]
    },
    User: {
      title: "User workspace dashboard",
      summary: "See your protected account space, token details, and personal access state.",
      cards: [
        { label: "Account access", value: "Active", text: "Your personal area is unlocked after server-side JWT verification." },
        { label: "Session type", value: "Protected", text: "Private routes stay available while your token remains valid." },
        { label: "Profile mode", value: "Standard", text: "You can review your account details and token source below." }
      ]
    }
  };

  const currentDashboard = dashboardConfig[user?.role] || dashboardConfig.User;

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
      <h2>{currentDashboard.title}</h2>
      <p className="muted">
        {currentDashboard.summary}
      </p>

      <div className="stats-grid">
        {currentDashboard.cards.map((card) => (
          <article className="info-card" key={card.label}>
            <span className="label">{card.label}</span>
            <strong>{card.value}</strong>
            <p>{card.text}</p>
          </article>
        ))}
      </div>

      <div className="stats-grid">
        <article className="info-card">
          <span className="label">Route status</span>
          <strong>Protected</strong>
          <p>React Router guard checked your session before rendering.</p>
        </article>

        <article className="info-card">
          <span className="label">Verification status</span>
          <strong>{loading ? "Checking..." : "Verified"}</strong>
          <p>{loading ? "Validating your token." : overview?.roleMessage}</p>
        </article>

        <article className="info-card accent-card">
          <span className="label">Server message</span>
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
