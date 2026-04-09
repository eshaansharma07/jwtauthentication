import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/overview", verifyToken, (req, res) => {
  return res.json({
    message: "JWT accepted",
    details: `Welcome ${req.user.name}. Your private route is protected on both client and server.`
  });
});

export default router;
