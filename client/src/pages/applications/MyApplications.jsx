import { useEffect, useState } from "react";

import CandidateLayout from "../../layouts/CandidateLayout";

import ApplicationCard from "../../components/applications/ApplicationCard";

import {
  getMyApplications,
} from "../../services/applicationService";

function MyApplications() {
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const fetchApplications =
    async () => {
      try {
        const response =
          await getMyApplications();

        setApplications(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <CandidateLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            My Applications
          </h1>

          <p className="mt-2 text-slate-500">
            Track your job applications.
          </p>

        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : applications.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-700">No Applications Yet</h2>
            <p className="mt-2 text-slate-500">Start applying to jobs to see your applications here.</p>
          </div>
        ) : (
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
        )}

      </div>

    </CandidateLayout>
  );
}

export default MyApplications;