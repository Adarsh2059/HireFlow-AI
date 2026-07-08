import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getATSReport } from "../../services/atsService";

import ATSScoreCard from "../../components/ats/ATSScoreCard";
import ATSSkillsCard from "../../components/ats/ATSSkillsCard";
import ATSSummaryCard from "../../components/ats/ATSSummaryCard";

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" />

            <h2 className="text-xl font-semibold">Loading ATS Report...</h2>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!report) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-2xl font-bold">No ATS Report Found</h2>

          <p className="mt-3 text-slate-500">
            Generate an ATS report from the Job Details page.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  console.log(report);
  console.log("Full Report:", report);
console.log("Job Match:", report?.jobMatch);
console.log("Match Percentage:", report?.jobMatch?.matchPercentage);
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">ATS Resume Report</h1>

        {report && (
          <>
            <ATSScoreCard jobMatch={report.jobMatch} />

            <ATSSkillsCard
              analysis={report.analysis}
              jobMatch={report.jobMatch}
            />

            <ATSSummaryCard summary={report.summary} />
          </>
        )}

        {/* <ATSSkillsCard analysis={report.analysis} jobMatch={report.jobMatch} />

        <ATSSummaryCard summary={report.summary} /> */}
      </div>
    </DashboardLayout>
  );
}

export default ATSReport;
