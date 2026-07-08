import mongoose from "mongoose";

const atsReportSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    analysis: {
      type: Object,
      required: true,
    },

    jobMatch: {
      type: Object,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    review: {
      type: Object,
      required: true,
    },

    interviewQuestions: {
      type: Object,
      required: true,
    },

    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "completed",
    },

    lastGeneratedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

atsReportSchema.index(
  {
    candidate: 1,
    job: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "ATSReport",
  atsReportSchema
);