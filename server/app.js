import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js"

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("HireFlow AI API Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.use(errorHandler);

export default app;