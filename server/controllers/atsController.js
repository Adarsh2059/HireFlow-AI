import User from "../models/User.js";
import Job from "../models/Job.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  analyzeResume,
  matchResumeToJob,
} from "../utils/ats/index.js";

export const analyzeResumeForJob = async (
  req,
  res,
  next
) => {
  try {

    const { jobId } = req.params;

    const candidate =
      await User.findById(req.user._id);

    if (!candidate) {
      throw new ApiError(
        404,
        "Candidate not found"
      );
    }

    if (!candidate.resumeText) {
      throw new ApiError(
        400,
        "Please upload your resume first."
      );
    }

    const job =
      await Job.findById(jobId);

    if (!job) {
      throw new ApiError(
        404,
        "Job not found"
      );
    }

    // Resume Analysis
    const analysis =
      analyzeResume(
        candidate.resumeText
      );

    // Job Match
    const jobMatch =
      matchResumeToJob(
        analysis.skills,
        `${job.title}

${job.description}

${job.requirements.join("\n")}`
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Resume analyzed successfully",
        {
          analysis,
          jobMatch,
        }
      )
    );

  } catch (error) {
    next(error);
  }
};