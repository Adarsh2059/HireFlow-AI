import api from "../axios";

export const getRecruiterDashboard = async () => {
  const response = await api.get("/jobs/dashboard/stats");
  return response.data.data;
};

export const getRecruiterJobs = async () => {
  const response = await api.get("/jobs/my-jobs");
  return response.data.data;
};

export const createJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};

export const updateJob = async (
  jobId,
  jobData
) => {
  const response = await api.patch(
    `/jobs/${jobId}`,
    jobData
  );

  return response.data;
};

export const deleteJob = async (
  jobId
) => {
  const response = await api.delete(
    `/jobs/${jobId}`
  );

  return response.data;
};