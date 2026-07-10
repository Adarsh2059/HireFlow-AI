import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import RecruiterLayout from "../../layouts/RecruiterLayout";

import RecruiterJobCard from "../../components/recruiter/RecruiterJobCard";

import { getRecruiterJobs, deleteJob } from "../../services/recruiterService";

import ConfirmModal from "../../components/common/ConfirmModal";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getRecruiterJobs();

      setJobs(data);
    } catch (error) {
      toast.error("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedJob(id);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      const response = await deleteJob(selectedJob);

      toast.success(response.message);

      setSelectedJob(null);

      setJobs((prev) => prev.filter((job) => job._id !== selectedJob));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <RecruiterLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">My Jobs</h1>

          <p className="mt-2 text-slate-500">Manage all your job postings.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h2 className="text-xl font-semibold">No Jobs Found</h2>

            <p className="mt-2 text-slate-500">Create your first job.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <RecruiterJobCard
                key={job._id}
                job={job}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        open={Boolean(selectedJob)}
        title="Delete Job"
        message="This action will permanently delete this job along with all applications and ATS reports."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setSelectedJob(null)}
      />
    </RecruiterLayout>
  );
}

export default MyJobs;
