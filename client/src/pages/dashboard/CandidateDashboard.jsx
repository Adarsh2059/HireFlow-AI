import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  FileText,
  ClipboardList,
  Sparkles,
} from "lucide-react";

import CandidateLayout from "../../layouts/CandidateLayout";

import { getCandidateDashboard } from "../../services/dashboardService";

function CandidateDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data =
        await getCandidateDashboard();

      setDashboard(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CandidateLayout>
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      </CandidateLayout>
    );
  }

  const stats = [
    {
      title: "Applications",
      value:
        dashboard.applications.length,
    },
    {
      title: "Resume",
      value:
        dashboard.user.resumeUrl
          ? "Uploaded"
          : "Missing",
    },
    {
      title: "ATS Ready",
      value:
        dashboard.user.resumeUrl
          ? "Yes"
          : "No",
    },
    {
      title: "Interviews",
      value:
        dashboard.applications.filter(
          (app) =>
            app.status ===
              "Interview" ||
            app.status ===
              "Selected" ||
            app.status === "Hired"
        ).length,
    },
  ];

  return (
    <CandidateLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Welcome,
            {" "}
            {dashboard.user.name}
            👋
          </h1>

          <p className="mt-2 text-slate-500">
            Track your applications,
            manage your resume and
            prepare with AI.
          </p>

        </div>

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((card) => (

            <div
              key={card.title}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >

              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                {card.value}
              </h2>

            </div>

          ))}

        </div>

        {/* Recent Applications */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold">
            Recent Applications
          </h2>

          {dashboard.applications.length ===
          0 ? (

            <p className="mt-6 text-slate-500">
              You haven't applied for
              any jobs yet.
            </p>

          ) : (

            <div className="mt-6 space-y-4">

              {dashboard.applications
                .slice(0, 5)
                .map((app) => (

                  <div
                    key={app._id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {app.job?.title ??
                          "Job Removed"}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {app.job?.company ??
                          "-"}
                      </p>

                    </div>

                    <span
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                    >
                      {app.status}
                    </span>

                  </div>

                ))}

            </div>

          )}

        </div>

        {/* Resume */}

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold">
            Resume Status
          </h2>

          <div className="mt-5 flex items-center justify-between">

            <div>

              <p className="font-medium">
                {dashboard.user.resumeUrl
                  ? "Resume Uploaded ✅"
                  : "No Resume Uploaded"}
              </p>

              <p className="mt-2 text-sm text-slate-500">

                {dashboard.user
                  .resumeUploadedAt
                  ? `Last Updated : ${new Date(
                      dashboard.user.resumeUploadedAt
                    ).toLocaleDateString()}`
                  : "Upload your resume to unlock ATS analysis."}

              </p>

            </div>

            <Link
              to="/resume"
              className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Manage Resume
            </Link>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid gap-6 md:grid-cols-3">

          <Link
            to="/jobs"
            className="rounded-xl border bg-white p-6 shadow-sm hover:border-blue-500"
          >

            <BriefcaseBusiness
              size={36}
              className="text-blue-600"
            />

            <h3 className="mt-4 text-lg font-semibold">
              Browse Jobs
            </h3>

            <p className="mt-2 text-slate-500">
              Explore available
              opportunities.
            </p>

          </Link>

          <Link
            to="/applications"
            className="rounded-xl border bg-white p-6 shadow-sm hover:border-blue-500"
          >

            <ClipboardList
              size={36}
              className="text-green-600"
            />

            <h3 className="mt-4 text-lg font-semibold">
              My Applications
            </h3>

            <p className="mt-2 text-slate-500">
              Track your hiring
              progress.
            </p>

          </Link>

          <Link
            to="/resume"
            className="rounded-xl border bg-white p-6 shadow-sm hover:border-blue-500"
          >

            <Sparkles
              size={36}
              className="text-purple-600"
            />

            <h3 className="mt-4 text-lg font-semibold">
              AI Resume
            </h3>

            <p className="mt-2 text-slate-500">
              Improve your ATS score.
            </p>

          </Link>

        </div>

      </div>
    </CandidateLayout>
  );
}

export default CandidateDashboard;