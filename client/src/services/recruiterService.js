import api from "../axios";

export const getRecruiterDashboard = async () => {
  const response = await api.get("/jobs/dashboard/stats");
  return response.data.data;
};

export const getRecruiterJobs = async () => {
  const response = await api.get("/jobs/my-jobs");
  return response.data.data;
};