import express from "express";

import { createJob,getAllJobs,getJobById,patchJob,deleteJob } from "../controllers/jobController.js";

import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.post(
    "/",
    protect,
    authorize("recruiter", "admin"),
    createJob
);

router.patch(
    "/:id",
    protect,
    authorize("recruiter", "admin"),
    patchJob
);

router.delete(
    "/:id",
    protect,
    authorize("recruiter", "admin"),
    deleteJob
);

export default router;