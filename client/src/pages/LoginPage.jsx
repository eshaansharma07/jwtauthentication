import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDefaultRouteForRole } from "../utils/roles";

const demoAccounts = [
  {
    label: "Admin",
    name: "Aarav Admin",
    email: "admin@auth.com",
    password: "password123",
    role: "Admin"
  },
  {
    label: "Moderator",
    name: "Mira Moderator",
    email: "moderator@auth.com",
    password: "password123",
    role: "Moderator"
  },
  {
    label: "User",
    name: "Nikhil User",
    email: "user@auth.com",
    password: "password123",
    role: "User"
  }
];

const demoCredentials = {
  email: demoAccounts[0].email,
  password: "password123"
};

const signupDefaults = {
  name: "",
  email: "",
  password: "",
  role: "User"
};

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, register, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: demoCredentials
  });

  const fallbackRoute = getDefaultRouteForRole(user?.role);
  const redirectPath = location.state?.from?.pathname || fallbackRoute;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(fallbackRoute, { replace: true });
    }
  }, [fallbackRoute, isAuthenticated, navigate]);

  const useDemoAccount = (account) => {
    setMode("login");
    setError("");
    setSuccess(`Loaded ${account.role} demo credentials.`);
    reset({
      email: account.email,
      password: account.password
    });
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setSuccess("");
    setSubmitting(false);
    reset(nextMode === "login" ? demoCredentials : signupDefaults);
  };

  const onSubmit = async (values) => {
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const result =
        mode === "login" ? await login(values) : await register(values);

      setSuccess(
        mode === "login"
          ? `Authentication successful for ${result.user.role}.`
          : `Account created with ${result.user.role} access.`
      );

      setTimeout(() => {
        navigate(redirectPath || getDefaultRouteForRole(result.user.role), {
          replace: true
        });
      }, 600);
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
        <p className="eyebrow">Combined Login + JWT + RBAC</p>
        <h1>Validate first, authenticate next, authorize by role.</h1>
        <p className="muted">
          This single experiment combines React state management, client-side
          form validation, backend JWT verification, protected routes, and
          role-based access control.
        </p>
        <div className="feature-grid">
          <article>
            <span>01</span>
            <h3>React Hook Form</h3>
            <p>Controlled inputs validate before any authentication request.</p>
          </article>
          <article>
            <span>02</span>
            <h3>JWT protection</h3>
            <p>Express-style API routes verify tokens before private data loads.</p>
          </article>
          <article>
            <span>03</span>
            <h3>RBAC guards</h3>
            <p>Admin, moderator, and user routes enforce role-specific access.</p>
          </article>
        </div>
      </section>

      <section className="login-card">
        <div>
          <p className="eyebrow">
            {mode === "login" ? "Secure login form" : "Create account"}
          </p>
          <h2>
            {mode === "login"
              ? "Validated sign in with feedback"
              : "Create a role-based protected session"}
          </h2>
          <p className="muted">
            {mode === "login"
              ? "Material UI provides alerts and spinner feedback while React Hook Form manages state."
              : "Choose a role and create a JWT-backed session that unlocks the right dashboard."}
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

        {mode === "login" ? (
          <div className="demo-grid">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                className="demo-card"
                onClick={() => useDemoAccount(account)}
              >
                <span className="label">{account.label}</span>
                <strong>{account.name}</strong>
                <span>{account.email}</span>
              </button>
            ))}
          </div>
        ) : null}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} className="login-form">
          {mode === "signup" ? (
            <>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Full name is required." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full name"
                    placeholder="Eshaan Sharma"
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="role"
                control={control}
                rules={{ required: "Role selection is required." }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Account role"
                    error={Boolean(errors.role)}
                    helperText={errors.role?.message}
                    fullWidth
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Moderator">Moderator</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </TextField>
                )}
              />
            </>
          ) : null}

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address."
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="Email"
                placeholder="demo@auth.com"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters."
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                placeholder="password123"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                fullWidth
              />
            )}
          />

          <Stack spacing={1}>
            {success ? <Alert severity="success">{success}</Alert> : null}
            {error ? <Alert severity="error">{error}</Alert> : null}
          </Stack>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            sx={{
              py: 1.6,
              borderRadius: "999px",
              fontWeight: 800,
              textTransform: "none",
              background: "linear-gradient(90deg, #ff9150, #ffb36a)",
              color: "#18120d",
              "&:hover": {
                background: "linear-gradient(90deg, #ff9150, #ffb36a)"
              }
            }}
          >
            {submitting ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress size={18} sx={{ color: "#18120d" }} />
                <span>
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </span>
              </Stack>
            ) : mode === "login" ? (
              "Login to continue"
            ) : (
              "Create account"
            )}
          </Button>
        </Box>

        <p className="helper-text">
          {mode === "login"
            ? "Each preset opens a different protected dashboard. Try "
            : "Your new account signs in immediately and unlocks the protected routes. Try "}
          <Link to="/dashboard">dashboard</Link>
          {mode === "login"
            ? " to review the combined experiment flow."
            : " after creating an account."}
        </p>
      </section>
    </div>
  );
}
