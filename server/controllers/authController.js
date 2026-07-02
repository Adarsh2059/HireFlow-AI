import User from "../models/User.js";
import {
    hashPassword,
    comparePassword,
} from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// ============================
// Register User
// ============================
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Basic Validation
        if (!name || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ApiError(409, "User already exists");
        }

        // Hash Password
        const hashedPassword = await hashPassword(password);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Generate JWT
        const token = generateToken(user._id, user.role);

        // Remove sensitive fields
        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.__v;

        res.status(201).json(
            new ApiResponse(
                201,
                "User registered successfully",
                {
                    user: userResponse,
                    token,
                }
            )
        );
    } catch (error) {
        next(error);
    }
};

// ============================
// Login User
// ============================
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            throw new ApiError(
                400,
                "Email and password are required"
            );
        }

        // Find User
        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(
                401,
                "Invalid email or password"
            );
        }

        // Compare Password
        const isPasswordCorrect = await comparePassword(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            throw new ApiError(
                401,
                "Invalid email or password"
            );
        }

        // Generate JWT
        const token = generateToken(user._id, user.role);

        // Remove sensitive fields
        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.__v;

        res.status(200).json(
            new ApiResponse(
                200,
                "Login successful",
                {
                    user: userResponse,
                    token,
                }
            )
        );
    } catch (error) {
        next(error);
    }
};

// ============================
// Get Current Logged-in User
// ============================
export const getCurrentUser = async (req, res) => {
    res.status(200).json(
        new ApiResponse(
            200,
            "Current User",
            req.user
        )
    );
};

// ============================
// Admin Dashboard (Protected)
// ============================
export const adminDashboard = (req, res) => {
    res.status(200).json(
        new ApiResponse(
            200,
            "Welcome Admin",
            {
                message: "This is an admin-only route.",
            }
        )
    );
};