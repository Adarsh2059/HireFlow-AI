import DashboardLayout from "../../layouts/DashboardLayout";

function CandidateDashboard() {
  const stats = [
    {
      title: "Applications",
      value: 0,
    },
    {
      title: "Resume Score",
      value: "--",
    },
    {
      title: "Interview Sets",
      value: 0,
    },
    {
      title: "Jobs Applied",
      value: 0,
    },
  ];

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
              <p className="text-slate-500 text-sm">
                {card.title}
              </p>

              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                {card.value}
              </h2>
            </div>
          ))}

        </div>

        <div className="rounded-xl bg-white p-8 shadow-sm border">

          <h2 className="text-xl font-semibold">
            Recent Activity
          </h2>

          <p className="mt-4 text-slate-500">
            Your recent AI analyses, applications and interview sessions will appear here.
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default CandidateDashboard;