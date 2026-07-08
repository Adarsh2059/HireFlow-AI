import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import ApplicationCard from "../../components/applications/ApplicationCard";

import {
  getMyApplications,
} from "../../services/applicationService";

function MyApplications() {
  const [applications, setApplications] =
    useState([]);

  const fetchApplications =
    async () => {
      const response =
        await getMyApplications();

      setApplications(response.data);
    };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            My Applications
          </h1>

          <p className="mt-2 text-slate-500">
            Track your job applications.
          </p>

        </div>

        <div className="space-y-5">

          {applications.map(
            (application) => (
              <ApplicationCard
                key={application._id}
                application={
                  application
                }
                refreshApplications={
                  fetchApplications
                }
              />
            )
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default MyApplications;