import express from "express";

import protect, {
  authorize,
} from "../middlewares/authMiddleware.js";

import {
  generateATS,
  getATSReport,
  reAnalyzeATS,
  getATSStatus,
} from "../controllers/atsController.js";

const router = express.Router();

// Generate ATS Report
router.post(
  "/analyze/:jobId",
  protect,
  authorize("candidate"),
  generateATS
);

// Get Cached ATS Report
router.get(
  "/report/:jobId",
  protect,
  authorize("candidate"),
  getATSReport
);

// Check ATS Report Status
router.get(
  "/status/:jobId",
  protect,
  authorize("candidate"),
  getATSStatus
);

// Force Re-Analyze
router.post(
  "/reanalyze/:jobId",
  protect,
  authorize("candidate"),
  reAnalyzeATS
);

export default router;