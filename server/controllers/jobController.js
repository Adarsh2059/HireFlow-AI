import Job from "../models/Job.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const createJob = async (req, res, next) => {
    try {
        const {
            title,
            company,
            location,
            description,
            requirements,
            salary,
            employmentType,
            experience,
        } = req.body;

        // Basic Validation
        if (
            !title ||
            !company ||
            !location ||
            !description ||
            !salary
        ) {
            throw new ApiError(
                400,
                "Please fill all required fields"
            );
        }

        const job = await Job.create({
            title,
            company,
            location,
            description,
            requirements,
            salary,
            employmentType,
            experience,
            recruiter: req.user._id,
        });

        res.status(201).json(
            new ApiResponse(
                201,
                "Job created successfully",
                job
            )
        );

    } catch (error) {
        next(error);
    }
};

export const getAllJobs = async (req, res, next) => {
    try {

        const jobs = await Job.find()
            .populate("recruiter", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(
            new ApiResponse(
                200,
                "Jobs fetched successfully",
                jobs
            )
        );

    } catch (error) {
        next(error);
    }
};

export const getJobById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id)
            .populate("recruiter", "name email");

        if (!job) {
            throw new ApiError(404, "Job not found");
        }

        res.status(200).json(
            new ApiResponse(
                200,
                "Job fetched successfully",
                job
            )
        );

    } catch (error) {
        next(error);
    }
};

export const patchJob = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id);

        if (!job) {
            throw new ApiError(404, "Job not found");
        }

        // Ownership Check
        if (
            req.user.role !== "admin" &&
            job.recruiter.toString() !== req.user._id.toString()
        ) {
            throw new ApiError(
                403,
                "You can update only your own jobs"
            );
        }

        const updatedJob = await Job.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).populate("recruiter", "name email");

        res.status(200).json(
            new ApiResponse(
                200,
                "Job updated successfully",
                updatedJob
            )
        );

    } catch (error) {
        next(error);
    }
};

export const deleteJob = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id);

        if (!job) {
            throw new ApiError(404, "Job not found");
        }

        // Ownership Check
        if (
            req.user.role !== "admin" &&
            job.recruiter.toString() !== req.user._id.toString()
        ) {
            throw new ApiError(
                403,
                "You can delete only your own jobs"
            );
        }

        await Job.findByIdAndDelete(id);

        res.status(200).json(
            new ApiResponse(
                200,
                "Job deleted successfully",
                null
            )
        );

    } catch (error) {
        next(error);
    }
};