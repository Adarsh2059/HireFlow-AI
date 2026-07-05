import express from "express";

import {
  analyzeResumeForJob,
} from "../controllers/atsController.js";

import protect,{ authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/analyze/:jobId",
  protect,
  authorize("candidate"),
  analyzeResumeForJob
);

export default router;