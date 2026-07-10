import Job from "../models/Job.js";
import ATSReport from "../models/ATSReport.js";

import ApiError from "../utils/ApiError.js";

import { analyzeResume, matchResumeToJob } from "../utils/ats/index.js";

import { generateATSReport } from "./geminiService.js";

export const generateATSForApplication = async (application) => {
  const job = await Job.findById(application.job);

  if (!job) {
    throw new ApiError(404, "Job not found.");
  }

  const existingReport = await ATSReport.findOne({
    candidate: application.candidate,
    job: application.job,
  });

  if (existingReport) {
    return existingReport;
  }

  const analysis = analyzeResume(application.resumeSnapshot.resumeText);

  const jobDescription = [job.title, job.description, ...job.requirements].join(
    "\n\n",
  );

  const jobMatch = matchResumeToJob(analysis.skills, jobDescription);

  let aiReport;

  try {
    aiReport = await generateATSReport({
      analysis,
      jobMatch,
      jobDescription,
    });
  } catch (error) {
    throw new ApiError(500, "Failed to generate AI ATS report.");
  }

  const report = await ATSReport.create({
    candidate: application.candidate,

    job: application.job,

    analysis,

    jobMatch,

    summary: aiReport.summary,

    review: aiReport.review,

    interviewQuestions: aiReport.interviewQuestions,

    status: "completed",

    lastGeneratedAt: new Date(),
  });

  return report;
};
