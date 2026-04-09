import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import privateRoutes from "./routes/privateRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    }
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    message: "JWT authentication API is running."
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/private", privateRoutes);

export default app;
