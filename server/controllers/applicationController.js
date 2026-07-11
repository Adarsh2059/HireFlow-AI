import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import ATSReport from "../models/ATSReport.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  APPLICATION_STATUS,
  ALLOWED_STATUS_TRANSITIONS,
} from "../constants/applicationStatus.js";

import { generateATSForApplication } from "../services/atsGenerationService.js";

// =======================================================
// Apply Job
// =======================================================

export const applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const candidateId = req.user._id;

    const candidate = await User.findById(candidateId);

    if (!candidate.resumeUrl) {
      throw new ApiError(
        400,
        "Please upload your resume before applying."
      );
    }

    const job = await Job.findById(jobId);

    if (!job) {
      throw new ApiError(404, "Job not found");
    }

    if (req.user.role !== "candidate") {
      throw new ApiError(
        403,
        "Only candidates can apply"
      );
    }

    if (job.status !== "Open") {
      throw new ApiError(
        400,
        "This job is closed."
      );
    }

    const alreadyApplied =
      await Application.findOne({
        candidate: candidateId,
        job: jobId,
      });

    if (alreadyApplied) {
      throw new ApiError(
        409,
        "Already applied."
      );
    }

    const application =
      await Application.create({
        candidate: candidateId,

        job: jobId,

        resumeSnapshot: {
          resumeUrl: candidate.resumeUrl,
          resumeText: candidate.resumeText,
          uploadedAt:
            candidate.resumeUploadedAt,
        },
      });

    let atsGenerated = true;

    try {
      await generateATSForApplication(
        application
      );
    } catch (error) {
      atsGenerated = false;

      console.error(
        "ATS Generation Failed:",
        error.message
      );
    }

    return res.status(201).json(
      new ApiResponse(
        201,
        atsGenerated
          ? "Application submitted successfully."
          : "Application submitted successfully. ATS report will be generated later.",
        {
          application,
          atsGenerated,
        }
      )
    );
  } catch (error) {
    next(error);
  }
};

// =======================================================
// Candidate Applications
// =======================================================

export const getMyApplications = async (
  req,
  res,
  next
) => {
  try {
    const applications =
      await Application.find({
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

    const validApplications =
      applications.filter(
        (application) =>
          application.job
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Applications fetched successfully",
        validApplications
      )
    );
  } catch (error) {
    next(error);
  }
};

// =======================================================
// Recruiter Applicants
// =======================================================

export const getApplicantsForJob = async (
  req,
  res,
  next
) => {
  try {
    const { jobId } = req.params;

    const job =
      await Job.findById(jobId);

    if (!job) {
      throw new ApiError(
        404,
        "Job not found"
      );
    }

    if (
      req.user.role !== "admin" &&
      job.recruiter.toString() !==
        req.user._id.toString()
    ) {
      throw new ApiError(
        403,
        "You can only view applicants for your own jobs"
      );
    }

    const applications =
      await Application.find({
        job: jobId,
      })
        .populate(
          "candidate",
          "name email avatar createdAt"
        )
        .populate(
          "job",
          "_id title"
        )
        .lean();

    const reports =
      await ATSReport.find({
        job: jobId,
      })
        .select(
          "candidate score"
        )
        .lean();

    const scoreMap = new Map();

    reports.forEach((report) => {
      scoreMap.set(
        report.candidate.toString(),
        report.score
      );
    });

    const enrichedApplications =
      applications.map(
        (application) => ({
          ...application,

          atsScore:
            scoreMap.get(
              application.candidate._id.toString()
            ) ?? null,
        })
      );

    enrichedApplications.sort(
      (a, b) =>
        (b.atsScore ?? -1) -
        (a.atsScore ?? -1)
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Applicants fetched successfully",
        enrichedApplications
      )
    );
  } catch (error) {
    next(error);
  }
};

// =======================================================
// Recruiter Update Status
// =======================================================

export const updateApplicationStatus =
  async (req, res, next) => {
    try {
      const { applicationId } =
        req.params;

      const { status } =
        req.body;

      const application =
        await Application.findById(
          applicationId
        ).populate("job");

      if (!application) {
        throw new ApiError(
          404,
          "Application not found"
        );
      }

      if (
        req.user.role !== "admin" &&
        application.job.recruiter.toString() !==
          req.user._id.toString()
      ) {
        throw new ApiError(
          403,
          "You can update only your own applicants"
        );
      }

      const currentStatus =
        application.status;

      if (
        !ALLOWED_STATUS_TRANSITIONS[
          currentStatus
        ]
      ) {
        throw new ApiError(
          400,
          `Unknown current application status: ${currentStatus}`
        );
      }

      if (
        !ALLOWED_STATUS_TRANSITIONS[
          currentStatus
        ].includes(status)
      ) {
        throw new ApiError(
          400,
          `Cannot change status from ${currentStatus} to ${status}`
        );
      }

      application.status = status;

      await application.save();

      return res.status(200).json(
        new ApiResponse(
          200,
          "Application status updated successfully",
          application
        )
      );
    } catch (error) {
      next(error);
    }
  };

// =======================================================
// Withdraw Application
// =======================================================

export const withdrawApplication =
  async (req, res, next) => {
    try {
      const { applicationId } =
        req.params;

      const application =
        await Application.findById(
          applicationId
        );

      if (!application) {
        throw new ApiError(
          404,
          "Application not found"
        );
      }

      if (
        application.candidate.toString() !==
        req.user._id.toString()
      ) {
        throw new ApiError(
          403,
          "You can withdraw only your own application"
        );
      }

      if (
        application.status ===
          APPLICATION_STATUS.REJECTED ||
        application.status ===
          APPLICATION_STATUS.HIRED
      ) {
        throw new ApiError(
          400,
          `Application already ${application.status.toLowerCase()}`
        );
      }

      if (
        application.status ===
        APPLICATION_STATUS.WITHDRAWN
      ) {
        throw new ApiError(
          400,
          "Application already withdrawn"
        );
      }

      application.status =
        APPLICATION_STATUS.WITHDRAWN;

      await application.save();

      return res.status(200).json(
        new ApiResponse(
          200,
          "Application withdrawn successfully",
          application
        )
      );
    } catch (error) {
      next(error);
    }
  };