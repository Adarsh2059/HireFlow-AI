import toast from "react-hot-toast";

import {
  withdrawApplication,
} from "../../services/applicationService";

function ApplicationCard({
  application,
  refreshApplications,
}) {
  const handleWithdraw = async () => {
    try {
      await withdrawApplication(
        application._id
      );

      toast.success(
        "Application withdrawn"
      );

      refreshApplications();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed"
      );
    }
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        {application.job.title}
      </h2>

      <p className="mt-2 text-slate-500">
        {application.job.company}
      </p>

      <p className="mt-2 text-slate-500">
        Status:
        <span className="ml-2 font-medium">
          {application.status}
        </span>
      </p>

      <div className="mt-6 flex gap-3">

        <button
          onClick={handleWithdraw}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Withdraw
        </button>

      </div>

    </div>
  );
}

export default ApplicationCard;