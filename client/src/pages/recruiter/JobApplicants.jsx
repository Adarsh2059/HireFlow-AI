import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import RecruiterLayout from "../../layouts/RecruiterLayout";

import ApplicantCard from "../../components/recruiter/ApplicantCard";

import {
  getApplicantsForJob,
} from "../../services/applicationService";

function JobApplicants() {
  const { jobId } = useParams();

  const [applicants, setApplicants] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response =
        await getApplicantsForJob(jobId);

      setApplicants(response.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch applicants."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <RecruiterLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Applicants
          </h1>

          <p className="mt-2 text-slate-500">
            Manage candidates who applied for this job.
          </p>

        </div>

        {loading ? (

          <div className="flex justify-center py-20">

            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          </div>

        ) : applicants.length === 0 ? (

          <div className="rounded-xl border bg-white p-10 text-center">

            <h2 className="text-xl font-semibold">
              No Applicants Yet
            </h2>

          </div>

        ) : (

          <div className="space-y-5">

            {applicants.map((applicant, index) => (

              <ApplicantCard
                key={applicant._id}
                applicant={applicant}
                rank={index + 1}
                refreshApplicants={fetchApplicants}
              />

            ))}

          </div>

        )}

      </div>

    </RecruiterLayout>
  );
}

export default JobApplicants;