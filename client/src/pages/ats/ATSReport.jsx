import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import CandidateLayout from "../../layouts/CandidateLayout";

import { getATSReport } from "../../services/atsService";

import ATSFullReport from "../../components/ats/ATSFullReport";
import ATSReviewCard from "../../components/ats/ATSReviewCard";
import ATSInterviewCard from "../../components/ats/ATSInterviewCard";

import toast from "react-hot-toast";

function ATSReport() {
  const { jobId } = useParams();

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    fetchReport();
  }, []);

  const fetchReport = async () => {
  try {
    const response = await getATSReport(jobId);

    setReport(response.data);

  } catch (error) {

    // If report doesn't exist, generate it automatically
    if (error.response?.status === 404) {

      toast.loading("Generating ATS Report...", {
        id: "ats",
      });

      await generateATS(jobId);

      const latest =
        await getATSReport(jobId);

      setReport(latest.data);

      toast.success(
        "ATS Report generated successfully.",
        {
          id: "ats",
        }
      );

    } else {

      toast.error(
        error.response?.data?.message ||
        "Failed to load ATS Report."
      );

    }

  } finally {

    setLoading(false);

  }
};

  if (loading) {
    return (
      <CandidateLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" />

            <h2 className="text-xl font-semibold">Loading ATS Report...</h2>
          </div>
        </div>
      </CandidateLayout>
    );
  }

  if (!report) {
    return (
      <CandidateLayout>
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-2xl font-bold">No ATS Report Found</h2>

          <p className="mt-3 text-slate-500">
            Generate an ATS report from the Job Details page.
          </p>
        </div>
      </CandidateLayout>
    );
  }

  return (
    <CandidateLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">ATS Resume Report</h1>

        {report && (
          <> 
            <ATSFullReport report={report}/>
          </>
        )}
      </div>
    </CandidateLayout>
  );
}

export default ATSReport;
