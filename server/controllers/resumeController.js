import User from "../models/User.js";
import parseResume from "../utils/parseResume.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.js";
import Application from "../models/Application.js";

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check whether current resume is attached to any active application

    const activeApplications = await Application.find({
      candidate: req.user._id,
      status: {
        $nin: ["Withdrawn", "Rejected", "Hired"],
      },
    });

    const resumeLocked = activeApplications.some((application) => {
      return (
        application.resumeSnapshot?.uploadedAt &&
        user.resumeUploadedAt &&
        new Date(application.resumeSnapshot.uploadedAt).getTime() ===
          new Date(user.resumeUploadedAt).getTime()
      );
    });

    if (resumeLocked) {
      return res.status(400).json({
        success: false,
        message:
          "Your current resume is attached to active job applications. Withdraw or complete those applications before replacing it.",
      });
    }

    const resumeText = await parseResume(req.file.buffer);

    if (user.resumePublicId) {
      await deleteFromCloudinary(user.resumePublicId);
    }

    const uploadedResume = await uploadToCloudinary(
      req.file.buffer,
      "HireFlow-AI/resume",
    );

    user.resumeUrl = uploadedResume.secure_url;
    user.resumePublicId = uploadedResume.public_id;
    user.resumeText = resumeText;
    user.resumeUploadedAt = new Date();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      data: {
        resumeUrl: user.resumeUrl,
        uploadedAt: user.resumeUploadedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// we first parse uploaded resume and then delete existing resume so that if it fails parsing then we dont delete prev resume

export const getResume = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select(
      "resumeUrl resumeUploadedAt",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        resumeUrl: user.resumeUrl,
        resumeUploadedAt: user.resumeUploadedAt,
        hasResume: Boolean(user.resumeUrl),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const activeApplications = await Application.find({
      candidate: req.user._id,
      status: {
        $nin: ["Withdrawn", "Rejected", "Hired"],
      },
    });

    const resumeLocked = activeApplications.some((application) => {
      return (
        application.resumeSnapshot?.uploadedAt &&
        user.resumeUploadedAt &&
        new Date(application.resumeSnapshot.uploadedAt).getTime() ===
          new Date(user.resumeUploadedAt).getTime()
      );
    });

    if (resumeLocked) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete your resume because it is attached to active job applications.",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.resumePublicId) {
      return res.status(404).json({
        success: false,
        message: "No resume found.",
      });
    }

    await deleteFromCloudinary(user.resumePublicId);

    user.resumeUrl = "";
    user.resumePublicId = "";
    user.resumeText = "";
    user.resumeUploadedAt = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
