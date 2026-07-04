import Application from "../models/Application.js";
import Job from "../models/Job.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  APPLICATION_STATUS,
  ALLOWED_STATUS_TRANSITIONS,
} from "../constants/applicationStatus.js";

export const applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const candidateId = req.user._id;

    // Check Job Exists
    const job = await Job.findById(jobId);

    if (!job) {
      throw new ApiError(404, "Job not found");
    }

    // Prevent Recruiters/Admin from applying
    if (req.user.role !== "candidate") {
      throw new ApiError(403, "Only candidates can apply for jobs");
    }

    // Duplicate Check
    const alreadyApplied = await Application.findOne({
      candidate: candidateId,
      job: jobId,
    });

    if (job.status !== "Open") {
      throw new ApiError(400, "This job is no longer accepting applications.");
    }

    if (alreadyApplied) {
      throw new ApiError(409, "You have already applied for this job");
    }

    // Create Application
    const application = await Application.create({
      candidate: candidateId,
      job: jobId,
    });

    res
      .status(201)
      .json(
        new ApiResponse(201, "Application submitted successfully", application),
      );
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id,
    })
      .populate({
        path: "job",
        populate: {
          path: "recruiter",
          select: "name email",
        },
      })
      .sort({
        createdAt: -1,
      });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Applications fetched successfully", applications),
      );
  } catch (error) {
    next(error);
  }
};

export const getApplicantsForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // Check Job Exists
    const job = await Job.findById(jobId);

    if (!job) {
      throw new ApiError(404, "Job not found");
    }

    // Ownership Check
    if (
      req.user.role !== "admin" &&
      job.recruiter.toString() !== req.user._id.toString()
    ) {
      throw new ApiError(403, "You can only view applicants for your own jobs");
    }

    const applications = await Application.find({
      job: jobId,
    })
      .populate("candidate", "name email avatar createdAt")
      .sort({
        createdAt: -1,
      });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Applicants fetched successfully", applications),
      );
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Find Application
    const application = await Application.findById(applicationId).populate(
      "job",
    );

    if (!application) {
      throw new ApiError(404, "Application not found");
    }

    // Ownership Check
    if (
      req.user.role !== "admin" &&
      application.job.recruiter.toString() !== req.user._id.toString()
    ) {
      throw new ApiError(
        403,
        "You can update only your own applicants",
      );
    }

    // Current Status
    const currentStatus = application.status;

    // Validate Current Status
    if (!ALLOWED_STATUS_TRANSITIONS[currentStatus]) {
      throw new ApiError(
        400,
        `Unknown current application status: ${currentStatus}`,
      );
    }

    // Validate Transition
    if (
      !ALLOWED_STATUS_TRANSITIONS[currentStatus].includes(status)
    ) {
      throw new ApiError(
        400,
        `Cannot change status from ${currentStatus} to ${status}`,
      );
    }

    // Update Status
    application.status = status;

    await application.save();

    res.status(200).json(
      new ApiResponse(
        200,
        "Application status updated successfully",
        application,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const withdrawApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);

    if (!application) {
      throw new ApiError(404, "Application not found");
    }

    // Candidate Ownership Check
    if (application.candidate.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You can withdraw only your own application");
    }

    // Already Finished?
    if (
      application.status === APPLICATION_STATUS.REJECTED ||
      application.status === APPLICATION_STATUS.HIRED
    ) {
      throw new ApiError(
        400,
        `Application already ${application.status.toLowerCase()}`,
      );
    }

    if (application.status === APPLICATION_STATUS.WITHDRAWN) {
      throw new ApiError(400, "Application already withdrawn");
    }

    application.status = APPLICATION_STATUS.WITHDRAWN;

    await application.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, "Application withdrawn successfully", application),
      );
  } catch (error) {
    next(error);
  }
};
