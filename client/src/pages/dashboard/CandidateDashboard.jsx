import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getCandidateDashboard } from "../../services/dashboardService";

function CandidateDashboard() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
  try {
    const data = await getCandidateDashboard();

    setStats([
      {
        title: "Applications",
        value: data.applications.length,
      },
      {
        title: "ATS Reports",
        value: data.user.resumeUrl ? 1 : 0,
      },
      {
        title: "Resume Quality",
        value: data.user.resumeUrl ? "Available" : "--",
      },
      {
        title: "Jobs Applied",
        value: data.applications.length,
      },
    ]);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome to HireFlow AI 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your resume, track applications and prepare for interviews using AI.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((card) => (
            <div
              key={card.title}
              className="rounded-xl bg-white p-6 shadow-sm border"
            >
              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                {card.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">
            Recent Activity
          </h2>

          <p className="mt-4 text-slate-500">
            Dashboard is now connected to live backend data.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CandidateDashboard;