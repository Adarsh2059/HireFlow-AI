import mongoose from "mongoose";
import { APPLICATION_STATUS } from "../constants/applicationStatus.js";

const applicationSchema = new mongoose.Schema(
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

    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.APPLIED,
    },

    resumeSnapshot: {
      resumeUrl: {
        type: String,
        required: true,
      },

      resumeText: {
        type: String,
        required: true,
      },

      uploadedAt: {
        type: Date,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
