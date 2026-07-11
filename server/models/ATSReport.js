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

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      default: "",
    },

    review: {
      overallRating: {
        type: String,
        default: "",
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      suggestions: {
        type: [String],
        default: [],
      },
    },

    candidateAnalysis: {
      skills: {
        type: [String],
        default: [],
      },

      education: [
        {
          institution: {
            type: String,
            default: "",
          },

          degree: {
            type: String,
            default: "",
          },

          dates: {
            type: String,
            default: "",
          },

          details: {
            type: String,
            default: "",
          },
        },
      ],

      experience: [
        {
          company: {
            type: String,
            default: "",
          },

          role: {
            type: String,
            default: "",
          },

          duration: {
            type: String,
            default: "",
          },

          description: {
            type: String,
            default: "",
          },
        },
      ],

      projects: [
        {
          title: {
            type: String,
            default: "",
          },

          description: {
            type: String,
            default: "",
          },

          technologies: {
            type: [String],
            default: [],
          },
        },
      ],
    },

    interviewQuestions: {
      technical: {
        type: [String],
        default: [],
      },

      projectBased: {
        type: [String],
        default: [],
      },

      behavioral: {
        type: [String],
        default: [],
      },

      hr: {
        type: [String],
        default: [],
      },
    },

    status: {
      type: String,
      enum: ["completed", "failed", "pending"],
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

export default mongoose.model(
  "ATSReport",
  atsReportSchema
);