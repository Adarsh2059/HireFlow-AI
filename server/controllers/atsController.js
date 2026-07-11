import Application from "../models/Application.js";
import ATSReport from "../models/ATSReport.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import { generateATSForApplication } from "../services/atsGenerationService.js";

// =====================================
// Generate ATS Report
// =====================================

export const generateATS = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { candidateId } = req.query;

    let query = {
      job: jobId,
      candidate: req.user._id,
    };

    // Recruiter/Admin can generate ATS for any applicant
    if (
      (req.user.role === "recruiter" ||
        req.user.role === "admin") &&
      candidateId
    ) {
      query.candidate = candidateId;
    }

    const application = await Application.findOne(query);

    if (!application) {
      throw new ApiError(404, "Application not found.");
    }

    const report = await generateATSForApplication(application);

    return res.status(201).json(
      new ApiResponse(
        201,
        "ATS report generated successfully.",
        report
      )
    );
  } catch (error) {
    next(error);
  }
};

// =====================================
// Get ATS Report
// =====================================

export const getATSReport = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { candidateId } = req.query;

    let query = {
      job: jobId,
      candidate: req.user._id,
    };

    if (
      (req.user.role === "recruiter" ||
        req.user.role === "admin") &&
      candidateId
    ) {
      query.candidate = candidateId;
    }

    const report = await ATSReport.findOne(query);

    if (!report) {
      throw new ApiError(404, "ATS report not found.");
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
// Re Analyze ATS
// =====================================

export const reAnalyzeATS = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { candidateId } = req.query;

    let query = {
      job: jobId,
      candidate: req.user._id,
    };

    if (
      (req.user.role === "recruiter" ||
        req.user.role === "admin") &&
      candidateId
    ) {
      query.candidate = candidateId;
    }

    const application = await Application.findOne(query);

    if (!application) {
      throw new ApiError(404, "Application not found.");
    }

    await ATSReport.findOneAndDelete({
      candidate: application.candidate,
      job: application.job,
    });

    const report = await generateATSForApplication(application);

    return res.status(200).json(
      new ApiResponse(
        200,
        "ATS report regenerated successfully.",
        report
      )
    );
  } catch (error) {
    next(error);
  }
};

// =====================================
// ATS Status
// =====================================

export const getATSStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { candidateId } = req.query;

    let query = {
      job: jobId,
      candidate: req.user._id,
    };

    if (
      (req.user.role === "recruiter" ||
        req.user.role === "admin") &&
      candidateId
    ) {
      query.candidate = candidateId;
    }

    const report = await ATSReport.findOne(query).select(
      "lastGeneratedAt"
    );

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