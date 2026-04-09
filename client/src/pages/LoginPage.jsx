import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const demoCredentials = {
  email: "demo@auth.com",
  password: "password123"
};

export default function LoginPage() {
  const [formData, setFormData] = useState(demoCredentials);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(formData);
      navigate(redirectPath, { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <section className="hero-panel">
        <p className="eyebrow">Protected Routes with JWT Verification</p>
        <h1>Build trust into your route flow, not just your UI.</h1>
        <p className="muted">
          This frontend stores the JWT in localStorage and asks the backend to
          verify it before private routes render.
        </p>
        <div className="feature-grid">
          <article>
            <span>01</span>
            <h3>Route guards</h3>
            <p>Unauthenticated users are redirected to login automatically.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Server validation</h3>
            <p>Express middleware verifies every protected request.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Persistent session</h3>
            <p>Reloading the app keeps access if the token is still valid.</p>
          </article>
        </div>
      </section>

      <section className="login-card">
        <div>
          <p className="eyebrow">Demo login</p>
          <h2>Welcome back</h2>
          <p className="muted">Use the prefilled demo account to enter.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="demo@auth.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password123"
              required
            />
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting ? "Signing in..." : "Login to continue"}
          </button>
        </form>

        <p className="helper-text">
          Private routes are available after login. Try{" "}
          <Link to="/dashboard">dashboard</Link> directly to see the guard in
          action.
        </p>
      </section>
    </div>
  );
}
