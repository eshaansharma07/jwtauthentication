import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const demoCredentials = {
  email: "demo@auth.com",
  password: "password123"
};

const signupDefaults = {
  name: "",
  email: "",
  password: ""
};

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState(demoCredentials);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
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

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setSubmitting(false);
    setFormData(nextMode === "login" ? demoCredentials : signupDefaults);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        await login(formData);
      } else {
        await register(formData);
      }

      navigate(redirectPath, { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          (mode === "login"
            ? "Login failed. Please check your credentials."
            : "Account creation failed. Please try again.")
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
          <p className="eyebrow">
            {mode === "login" ? "Demo login" : "Create account"}
          </p>
          <h2>{mode === "login" ? "Welcome back" : "Start your private session"}</h2>
          <p className="muted">
            {mode === "login"
              ? "Use the prefilled demo account to enter."
              : "Create a JWT-backed session instantly and enter the protected area."}
          </p>
        </div>

        <div className="auth-toggle" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            className={mode === "login" ? "toggle-button active" : "toggle-button"}
            onClick={() => switchMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "signup" ? "toggle-button active" : "toggle-button"}
            onClick={() => switchMode("signup")}
          >
            Create account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {mode === "signup" ? (
            <label>
              Full name
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Eshaan Sharma"
                required
              />
            </label>
          ) : null}

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
            {submitting
              ? mode === "login"
                ? "Signing in..."
                : "Creating account..."
              : mode === "login"
                ? "Login to continue"
                : "Create account"}
          </button>
        </form>

        <p className="helper-text">
          {mode === "login"
            ? "Private routes are available after login. Try "
            : "Your new account signs in immediately and unlocks the protected routes. Try "}
          <Link to="/dashboard">dashboard</Link>
          {mode === "login"
            ? " directly to see the guard in action."
            : " after creating an account."}
        </p>
      </section>
    </div>
  );
}
