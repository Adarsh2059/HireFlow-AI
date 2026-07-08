import { useEffect, useState } from "react";

import {
  BriefcaseBusiness,
  FolderOpen,
  Users,
  BadgeCheck,
} from "lucide-react";

import RecruiterLayout from "../../layouts/RecruiterLayout";

import DashboardStatCard from "../../components/recruiter/DashboardStatCard";

import { getRecruiterDashboard } from "../../services/recruiterService";

import { Link } from "react-router-dom";

function RecruiterDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

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

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <RecruiterLayout>

        <div className="flex h-[70vh] items-center justify-center">

          <div className="space-y-4 text-center">

            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

            <p className="font-medium">
              Loading Dashboard...
            </p>

          </div>

        </div>

      </RecruiterLayout>
    );
  }

  const stats = [
    {
      title: "Jobs Posted",
      value: dashboard.totalJobs,
      icon: BriefcaseBusiness,
    },
    {
      title: "Open Jobs",
      value: dashboard.openJobs,
      icon: FolderOpen,
    },
    {
      title: "Applications",
      value: dashboard.totalApplications,
      icon: Users,
    },
    {
      title: "Hired",
      value: dashboard.hired,
      icon: BadgeCheck,
    },
  ];

  return (
    <RecruiterLayout>

      <div className="space-y-10">

        <div>

          <h1 className="text-3xl font-bold">
            Recruiter Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage jobs and applicants.
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

        <div className="rounded-xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-semibold">
              Recent Jobs
            </h2>

          </div>

          {dashboard.recentJobs.length === 0 ? (

            <div className="p-10 text-center text-slate-500">

              No jobs posted yet.

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left">
                      Job
                    </th>

                    <th className="px-6 py-4 text-left">
                      Applicants
                    </th>

                    <th className="px-6 py-4 text-left">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left">
                      Created
                    </th>

                    <th className="px-6 py-4 text-left">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {dashboard.recentJobs.map((job) => (

                    <tr
                      key={job._id}
                      className="border-t"
                    >

                      <td className="px-6 py-5">

                        <h3 className="font-semibold">
                          {job.title}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {job.company}
                        </p>

                      </td>

                      <td className="px-6 py-5">

                        {job.applicantCount}

                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            job.status === "Open"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {job.status}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        {new Date(
                          job.createdAt
                        ).toLocaleDateString()}

                      </td>

                      <td className="px-6 py-5">

                        <Link
                          to={`/recruiter/jobs/${job._id}/applicants`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          View Applicants
                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </RecruiterLayout>
  );
}

export default RecruiterDashboard;