import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import atsRoutes from "./routes/atsRoutes.js";

const app = express();

// Local Development CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.send("HireFlow AI API Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ats", atsRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;