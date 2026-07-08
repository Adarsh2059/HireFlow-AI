import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import CandidateLayout from "../../layouts/CandidateLayout";

import { getJobById } from "../../services/jobService";

import { applyJob, getMyApplications } from "../../services/applicationService";

import { generateATS, getATSStatus } from "../../services/atsService";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [applicationStatus, setApplicationStatus] = useState(null);

  const [generating, setGenerating] = useState(false);

  const [hasATSReport, setHasATSReport] = useState(false);

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

      // Load ATS Status
      try {
        const atsStatus = await getATSStatus(id);

        setHasATSReport(atsStatus.data.exists);
      } catch (error) {
        // No ATS report exists yet
        setHasATSReport(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      await applyJob(id);

      toast.success("Application submitted successfully.");

      await fetchJob();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  const handleAnalyze = async () => {
    if (hasATSReport) {
      navigate(`/ats/${id}`);
      return;
    }

    try {
      setGenerating(true);

      const response = await generateATS(id);

      toast.success(response.message);

      setHasATSReport(true);

      navigate(`/ats/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Analysis failed.");
    } finally {
      setGenerating(false);
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
            disabled={applicationStatus !== null}
            className={`rounded-lg px-8 py-3 font-medium text-white transition ${
              applicationStatus
                ? "cursor-not-allowed bg-slate-500"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {applicationStatus || "Apply Now"}
          </button>

          <button
            onClick={handleAnalyze}
            disabled={generating}
            className="rounded-lg border border-blue-600 px-8 py-3 font-medium text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
          >
            {generating
              ? "Generating..."
              : hasATSReport
                ? "View ATS Report"
                : "Analyze Resume"}
          </button>
        </div>
      </div>
    </CandidateLayout>
  );
}

export default JobDetails;
