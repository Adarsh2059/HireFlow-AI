import toast from "react-hot-toast";
import { withdrawApplication } from "../../services/applicationService";
import StatusBadge from "../common/StatusBadge";
import { useNavigate } from "react-router-dom";

function ApplicationCard({ application, refreshApplications }) {
  const navigate = useNavigate();
  const handleWithdraw = async () => {
    try {
      await withdrawApplication(application._id);

      toast.success("Application withdrawn");

      refreshApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  if (!application.job) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">Job No Longer Available</h2>

        <p className="mt-2 text-sm text-red-600">
          This job has been removed by the recruiter.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{application.job.title}</h2>

      <p className="mt-2 text-slate-500">{application.job.company}</p>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-slate-500">Status:</span>

        <StatusBadge status={application.status} />
      </div>

      {application.resumeSnapshot?.uploadedAt && (
        <p className="mt-3 text-sm text-slate-500">
          Resume submitted on{" "}
          {new Date(application.resumeSnapshot.uploadedAt).toLocaleDateString()}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <div className="mt-6 flex flex-wrap gap-3">
          {application.status !== "Withdrawn" &&
            application.status !== "Rejected" &&
            application.status !== "Hired" && (
              <button
                onClick={handleWithdraw}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Withdraw
              </button>
            )}

          {application.resumeSnapshot?.resumeUrl && (
            <a
              href={application.resumeSnapshot.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
            >
              Submitted Resume
            </a>
          )}

          <button
            onClick={() => navigate(`/ats/${application.job._id}`)}
            className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
          >
            View ATS Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
