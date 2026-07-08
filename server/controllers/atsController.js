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
      (req.user.role === "recruiter" || req.user.role === "admin") &&
      candidateId
    ) {
      candidateQueryId = candidateId;
    }

    const candidate = await User.findById(
      candidateQueryId
    );

    if (!candidate) {
      throw new ApiError(
        404,
        "Candidate not found."
      );
    }

    if (!candidate.resumeText) {
      throw new ApiError(
        400,
        "Please upload your resume first."
      );
    }

    const job = await Job.findById(jobId);

    if (!job) {
      throw new ApiError(
        404,
        "Job not found."
      );
    }

    // Check Cache

    const existingReport =
      await ATSReport.findOne({
        candidate: candidate._id,
        job: job._id,
      });

    if (existingReport) {
      return res.status(200).json(
        new ApiResponse(
          200,
          "ATS report already exists.",
          existingReport
        )
      );
    }

    // Local Analysis

    const analysis = analyzeResume(
      candidate.resumeText
    );

    const jobMatch =
      matchResumeToJob(
        analysis.skills,
        `${job.title}

${job.description}

${job.requirements.join("\n")}`
      );

    // AI

    const aiReport =
      await generateATSReport({
        analysis,
        jobMatch,
        jobDescription: `${job.title}

${job.description}

${job.requirements.join("\n")}`,
      });

    // Save

    const report =
      await ATSReport.create({
        candidate: candidate._id,

        job: job._id,

        analysis,

        jobMatch,

        summary: aiReport.summary,

        review: aiReport.review,

        interviewQuestions:
          aiReport.interviewQuestions,

        status: "completed",

        lastGeneratedAt: new Date(),
      });

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
      throw new ApiError(
        404,
        "ATS report not found."
      );
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

    return generateATS(
      req,
      res,
      next
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