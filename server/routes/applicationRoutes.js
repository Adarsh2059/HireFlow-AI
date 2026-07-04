import express from "express";

import { applyJob,getMyApplications,getApplicantsForJob,updateApplicationStatus,withdrawApplication } from "../controllers/applicationController.js";

import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.post(
    "/:jobId",
    protect,
    authorize("candidate"),
    applyJob
);

router.get(
    "/my-applications",
    protect,
    authorize("candidate"),
    getMyApplications
);

router.get(
    "/job/:jobId",
    protect,
    authorize("recruiter", "admin"),
    getApplicantsForJob
);

router.patch(
    "/:applicationId/status",
    protect,
    authorize("recruiter", "admin"),
    updateApplicationStatus
);

router.patch(
    "/:applicationId/withdraw",
    protect,
    authorize("candidate"),
    withdrawApplication
);

export default router;