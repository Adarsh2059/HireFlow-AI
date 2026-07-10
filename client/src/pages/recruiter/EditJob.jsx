import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import RecruiterLayout from "../../layouts/RecruiterLayout";
import JobForm from "../../components/recruiter/JobForm";
import Button from "../../components/ui/Button";

import {
  getRecruiterJobById,
  updateJob,
} from "../../services/recruiterService";

function EditJob() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response =
        await getRecruiterJobById(id);

      setJob(response.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load job."
      );

      navigate("/recruiter/jobs");

    } finally {

      setLoading(false);

    }
  };

  const handleSubmit = async (
    formData
  ) => {
    try {

      setSaving(true);

      const response =
        await updateJob(
          id,
          formData
        );

      toast.success(
        response.message
      );

      navigate("/recruiter/jobs");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to update job."
      );

    } finally {

      setSaving(false);

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

  return (
    <RecruiterLayout>

      <div className="mx-auto max-w-5xl space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Edit Job
            </h1>

            <p className="mt-2 text-slate-500">
              Update your job posting.
            </p>

          </div>

          <Button
            className="bg-slate-600 hover:bg-slate-700"
            onClick={() =>
              navigate("/recruiter/jobs")
            }
          >
            Cancel
          </Button>

        </div>

        <JobForm
          initialValues={job}
          loading={saving}
          submitText="Update Job"
          onSubmit={handleSubmit}
        />

      </div>

    </RecruiterLayout>
  );
}

export default EditJob;