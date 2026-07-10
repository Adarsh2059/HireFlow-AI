import { useState } from "react";
import toast from "react-hot-toast";

import ATSModal from "./ATSModal";

import { getATSReport, reAnalyzeATS } from "../../services/atsService";

import { updateApplicationStatus } from "../../services/applicationService";

function ApplicantCard({ applicant, refreshApplicants }) {
  const [report, setReport] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [loadingATS, setLoadingATS] = useState(false);

  const nextStatus = {
    Applied: "Screening",
    Screening: "Shortlisted",
    Shortlisted: "Interview",
    Interview: "Selected",
    Selected: "Hired",
  };

  const canTakeAction = !["Rejected", "Hired", "Withdrawn"].includes(
    applicant.status,
  );

  const handleViewATS = async () => {
    try {
      setLoadingATS(true);

      const response = await getATSReport(
        applicant.job._id,
        applicant.candidate._id,
      );

      setReport(response.data);

      setOpenModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "ATS Report not found");
    } finally {
      setLoadingATS(false);
    }
  };

  const handleReAnalyze = async () => {
    try {
      setLoadingATS(true);

      const response = await reAnalyzeATS(
        applicant.job._id,
        applicant.candidate._id,
      );

      toast.success(response.message);

      const latest = await getATSReport(
        applicant.job._id,
        applicant.candidate._id,
      );

      setReport(latest.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to re-analyze ATS.");
    } finally {
      setLoadingATS(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      const response = await updateApplicationStatus(applicant._id, status);

      toast.success(response.message);

      refreshApplicants();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status.");
    }
  };

  return (
    <>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {applicant.candidate.name}
            </h2>

            <p className="text-slate-500">{applicant.candidate.email}</p>

            <p className="mt-2 text-sm text-slate-500">
              Applied on {new Date(applicant.createdAt).toLocaleDateString()}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              applicant.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : applicant.status === "Hired"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
            }`}
          >
            {applicant.status}
          </span>
        </div>

        {/* Buttons */}

        <div className="mt-6 flex flex-wrap gap-3">
          {applicant.resumeSnapshot?.resumeUrl ? (
            <a
              href={applicant.resumeSnapshot.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border px-4 py-2 hover:bg-slate-100"
            >
              Submitted Resume
            </a>
          ) : (
            <span className="rounded-lg border border-slate-300 px-4 py-2 text-slate-400">
              Resume Unavailable
            </span>
          )}

          <button
            onClick={handleViewATS}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            ATS Report
          </button>

          {canTakeAction && (
            <>
              {nextStatus[applicant.status] && (
                <button
                  onClick={() =>
                    handleStatusUpdate(nextStatus[applicant.status])
                  }
                  className="rounded-lg border border-green-600 px-4 py-2 text-green-700 hover:bg-green-50 transition"
                >
                  Move to {nextStatus[applicant.status]}
                </button>
              )}

              <button
                onClick={() => handleStatusUpdate("Rejected")}
                className="rounded-lg border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50 transition"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>

      <ATSModal
        open={openModal}
        report={report}
        loading={loadingATS}
        onClose={() => setOpenModal(false)}
        onReAnalyze={handleReAnalyze}
      />
    </>
  );
}

export default ApplicantCard;
