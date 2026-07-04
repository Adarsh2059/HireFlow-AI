import express from "express";
import {
    uploadResume,
    getResume,
    deleteResume,
} from "../controllers/resumeController.js";

import upload from "../middlewares/upload.js";
import protect, { authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
    "/upload",
    protect,
    authorize("candidate"),
    upload.single("resume"),
    uploadResume
);

router.get(
    "/",
    protect,
    authorize("candidate"),
    getResume
);

router.delete(
    "/",
    protect,
    authorize("candidate"),
    deleteResume
);

export default router;