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

        const {
            search,
            location,
            employmentType,
            experience,
            page = 1,
            limit = 10,
            sort = "latest",
        } = req.query;

        let filter = {};

         let sortOption = {};

switch (sort) {
    case "latest":
        sortOption = { createdAt: -1 };
        break;

    case "oldest":
        sortOption = { createdAt: 1 };
        break;

    case "salary_desc":
        sortOption = { salary: -1 };
        break;

    case "salary_asc":
        sortOption = { salary: 1 };
        break;

    default:
        sortOption = { createdAt: -1 };
}

        // Search
        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    company: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Filters
        if (location) {
            filter.location = {
                $regex: location,
                $options: "i",
            };
        }

        if (employmentType) {
            filter.employmentType = employmentType;
        }

        if (experience) {
            filter.experience = experience;
        }

        // Convert to Number
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        // Skip Formula
        const skip = (pageNumber - 1) * limitNumber;

        // Total Jobs
        const totalJobs = await Job.countDocuments(filter);

        const jobs = await Job.find(filter)
            .populate("recruiter", "name email")
            .sort({ sortOption })
            .skip(skip)
            .limit(limitNumber);

        res.status(200).json(
            new ApiResponse(
                200,
                "Jobs fetched successfully",
                {
                    jobs,
                    pagination: {
                        totalJobs,
                        currentPage: pageNumber,
                        totalPages: Math.ceil(totalJobs / limitNumber),
                        limit: limitNumber,
                    },
                }
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

export const getDashboardStats = async (req, res, next) => {
    try {

        const recruiterId = req.user._id;

        const [
            totalJobs,
            openJobs,
            closedJobs,
            recentJobs,
        ] = await Promise.all([

            Job.countDocuments({
                recruiter: recruiterId,
            }),

            Job.countDocuments({
                recruiter: recruiterId,
                status: "Open",
            }),

            Job.countDocuments({
                recruiter: recruiterId,
                status: "Closed",
            }),

            Job.find({
                recruiter: recruiterId,
            })
                .sort({ createdAt: -1 })
                .limit(5)

        ]);

        res.status(200).json(
            new ApiResponse(
                200,
                "Dashboard fetched successfully",
                {
                    totalJobs,
                    openJobs,
                    closedJobs,
                    recentJobs,
                }
            )
        );

    } catch (error) {
        next(error);
    }
};