import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="center-screen">
      <div className="status-card">
        <p className="eyebrow">404</p>
        <h2>Page not found</h2>
        <p className="muted">
          The page you requested does not exist. Return to the login flow.
        </p>
        <Link to="/login" className="primary-button">
          Back to login
        </Link>
      </div>
    </div>
  );
}
