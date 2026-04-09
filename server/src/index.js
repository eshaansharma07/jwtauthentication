import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import privateRoutes from "./routes/privateRoutes.js";
import { PORT } from "./config.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "JWT authentication API is running."
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/private", privateRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
