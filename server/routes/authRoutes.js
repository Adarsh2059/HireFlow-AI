import express from "express";

import protect from "../middlewares/authMiddleware.js";

import authorize from "../middlewares/authorize.js";

import {
    registerUser,
    loginUser,
    getCurrentUser,
    adminDashboard,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getCurrentUser);

router.get(
    "/admin",
    protect,
    authorize("admin"),
    adminDashboard
);

export default router;