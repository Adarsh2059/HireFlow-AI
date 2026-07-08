import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import RecruiterLayout from "../../layouts/RecruiterLayout";
import JobForm from "../../components/recruiter/JobForm";

import { createJob } from "../../services/recruiterService";

function CreateJob() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreateJob = async (jobData) => {
    try {
      setLoading(true);

      const response = await createJob(jobData);

      toast.success(response.message);

      navigate("/recruiter/jobs");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create job."
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
            Create New Job
          </h1>

          <p className="mt-2 text-slate-500">
            Fill the details below to publish a new job opening.
          </p>

        </div>

        <JobForm
          submitText="Create Job"
          loading={loading}
          onSubmit={handleCreateJob}
        />

      </div>

    </RecruiterLayout>
  );
}

export default CreateJob;