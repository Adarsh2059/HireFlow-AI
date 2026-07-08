import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import DashboardStatCard from "../../components/recruiter/DashboardStatCard";

import { getRecruiterDashboard } from "../../services/recruiterService";

function RecruiterDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data =
        await getRecruiterDashboard();

      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: "Jobs Posted",
      value: dashboard.totalJobs,
    },
    {
      title: "Open Jobs",
      value: dashboard.openJobs,
    },
    {
      title: "Applications",
      value:
        dashboard.totalApplications,
    },
    {
      title: "Hired",
      value: dashboard.hired,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <h1 className="text-3xl font-bold">
          Recruiter Dashboard
        </h1>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item) => (
            <DashboardStatCard
              key={item.title}
              {...item}
            />
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default RecruiterDashboard;