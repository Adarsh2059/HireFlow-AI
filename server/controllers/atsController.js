import User from "../models/User.js";
import Job from "../models/Job.js";
import ATSReport from "../models/ATSReport.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  analyzeResume,
  matchResumeToJob,
} from "../utils/ats/index.js";

import {
  generateATSReport,
} from "../services/geminiService.js";

import Application from "../models/Application.js";

import {
  generateATSForApplication,
} from "../services/atsGenerationService.js";
// =====================================
// Generate ATS Report (ONLY ONCE)
// =====================================

export const generateATS = async (
  req,
  res,
  next
) => {
  try {

    const { jobId } = req.params;
    const { candidateId } = req.query;

    let candidateQueryId = req.user._id;

    if (
      (req.user.role === "recruiter" ||
        req.user.role === "admin") &&
      candidateId
    ) {
      candidateQueryId = candidateId;
    }

    const application =
      await Application.findOne({
        candidate: candidateQueryId,
        job: jobId,
      });

    if (!application) {
      throw new ApiError(
        404,
        "Application not found."
      );
    }

    const report =
      await generateATSForApplication(
        application
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        "ATS Report generated successfully.",
        report
      )
    );

  } catch (error) {
    next(error);
  }
};

// =====================================
// Get Cached Report
// =====================================

export const getATSReport = async (
  req,
  res,
  next
) => {
  try {
    const { jobId } = req.params;
    const { candidateId } = req.query;

    let candidateQueryId = req.user._id;
    if (
      (req.user.role === "recruiter" || req.user.role === "admin") &&
      candidateId
    ) {
      candidateQueryId = candidateId;
    }

    const report =
      await ATSReport.findOne({
        candidate: candidateQueryId,
        job: jobId,
      });

    if (!report) {

    await generateATS(req,res,next);

    report = await ATSReport.findOne({
        candidate: candidateQueryId,
        job: jobId,
    });

}

    return res.status(200).json(
      new ApiResponse(
        200,
        "ATS report fetched successfully.",
        report
      )
    );

  } catch (error) {
    next(error);
  }
};

// =====================================
// Re Analyze
// =====================================

export const reAnalyzeATS = async (
  req,
  res,
  next
) => {
  try {

    const { jobId } = req.params;
    const { candidateId } = req.query;

    let candidateQueryId = req.user._id;
    if (
      (req.user.role === "recruiter" || req.user.role === "admin") &&
      candidateId
    ) {
      candidateQueryId = candidateId;
    }

    await ATSReport.findOneAndDelete({
  candidate: candidateQueryId,
  job: jobId,
});

const application =
  await Application.findOne({
    candidate: candidateQueryId,
    job: jobId,
  });

if (!application) {
  throw new ApiError(
    404,
    "Application not found."
  );
}

const report =
  await generateATSForApplication(
    application
  );

return res.status(200).json(
  new ApiResponse(
    200,
    "ATS Report regenerated successfully.",
    report
  )
);

  } catch (error) {
    next(error);
  }
};

export const getATSStatus = async (
  req,
  res,
  next
) => {
  try {

    const { jobId } = req.params;
    const { candidateId } = req.query;

    let candidateQueryId = req.user._id;
    if (
      (req.user.role === "recruiter" || req.user.role === "admin") &&
      candidateId
    ) {
      candidateQueryId = candidateId;
    }

    const report =
      await ATSReport.findOne({
        candidate: candidateQueryId,
        job: jobId,
      }).select("lastGeneratedAt");

    return res.status(200).json(
      new ApiResponse(
        200,
        "ATS status fetched successfully.",
        {
          exists: Boolean(report),
          lastGeneratedAt:
            report?.lastGeneratedAt || null,
        }
      )
    );

  } catch (error) {
    next(error);
  }
};