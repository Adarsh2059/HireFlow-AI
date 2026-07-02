import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const protect = async (req, res, next) => {
    try {

        // Read Authorization Header
        const authHeader = req.headers.authorization;

        // Check if token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Not authorized. Token missing.");
        }

        // Extract Token
        const token = authHeader.split(" ")[1];


        console.log("Authorization Header:", authHeader);
        console.log("Extracted Token:", token);




        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find User
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        next(error);
    }
};

export default protect;