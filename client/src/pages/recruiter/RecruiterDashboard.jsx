import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RecruiterLayout from "../../layouts/RecruiterLayout";
import DashboardStatCard from "../../components/recruiter/DashboardStatCard";

import { getRecruiterDashboard } from "../../services/recruiterService";

function RecruiterDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getRecruiterDashboard();

      setDashboard(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      </RecruiterLayout>
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
      value: dashboard.totalApplications,
    },
    {
      title: "Hired",
      value: dashboard.hired,
    },
  ];

  return (
    <RecruiterLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            Recruiter Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage jobs and applicants from one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <DashboardStatCard
              key={item.title}
              {...item}
            />
          ))}
        </div>

        {/* Recent Jobs */}

        <div className="rounded-xl border bg-white shadow-sm">

          <div className="border-b px-6 py-4">

            <h2 className="text-xl font-semibold">
              Recent Jobs
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-3 text-left">
                    Job
                  </th>

                  <th className="px-6 py-3 text-left">
                    Applicants
                  </th>

                  <th className="px-6 py-3 text-left">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left">
                    Created
                  </th>

                  <th className="px-6 py-3 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {dashboard.recentJobs.map((job) => (

                  <tr
                    key={job._id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <div className="font-semibold">
                        {job.title}
                      </div>

                      <div className="text-sm text-slate-500">
                        {job.company}
                      </div>

                    </td>

                    <td className="px-6 py-4">
                      {job.applicantCount}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          job.status === "Open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">
                      {new Date(
                        job.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-center">

                      <Link
                        to={`/recruiter/jobs/${job._id}/applicants`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        View Applicants
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </RecruiterLayout>
  );
}

export default RecruiterDashboard;