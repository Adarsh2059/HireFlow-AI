import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import CandidateLayout from "../../layouts/CandidateLayout";

import { getJobById } from "../../services/jobService";

import { applyJob, getMyApplications } from "../../services/applicationService";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [applicationStatus, setApplicationStatus] = useState(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      setLoading(true);

      // Load Job
      const jobResponse = await getJobById(id);
      setJob(jobResponse.data);

      // Load Applications
      try {
        const applicationResponse = await getMyApplications();

        const application = applicationResponse.data.find(
          (app) => app.job && String(app.job._id) === String(id),
        );

        setApplicationStatus(application?.status || null);
      } catch (error) {
        console.log("Applications Error:", error);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);

      const response = await applyJob(id);

if (response.data.atsGenerated) {
    toast.success(
        "Application submitted successfully."
    );
} else {
    toast.success(
        "Application submitted. ATS report will be generated when available."
    );
}

await fetchJob();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <CandidateLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" />
            <p className="text-lg font-medium">Loading Job...</p>
          </div>
        </div>
      </CandidateLayout>
    );
  }

  if (!job) {
    return (
      <CandidateLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <p className="text-lg font-medium">Job not found.</p>
        </div>
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      {applying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <div className="flex justify-center">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>

            <h2 className="mt-6 text-center text-2xl font-semibold">
              Submitting Application
            </h2>

            <p className="mt-3 text-center text-slate-500">
              Please wait while we save your application, secure your submitted
              resume, and generate your personalized ATS report.
            </p>

            <p className="mt-6 text-center text-sm text-slate-400">
              This usually takes a few seconds...
            </p>
          </div>
        </div>
      )}
      <div className="max-w-5xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold">{job.title}</h1>

          <p className="mt-2 text-slate-500">
            {job.company} • {job.location}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-8">
          <h2 className="text-xl font-semibold">Description</h2>

          <p className="mt-4 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="rounded-xl border bg-white p-8">
          <h2 className="text-xl font-semibold">Requirements</h2>

          <ul className="mt-4 list-disc pl-6">
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleApply}
            disabled={applicationStatus !== null || applying}
            className={`rounded-lg px-8 py-3 font-medium text-white transition ${
              applicationStatus || applying
                ? "cursor-not-allowed bg-slate-500"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {applying ? "Submitting..." : applicationStatus || "Apply Now"}
          </button>
        </div>
      </div>
    </CandidateLayout>
  );
}

export default JobDetails;
