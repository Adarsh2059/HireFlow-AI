import api from "../axios";

export const getJobs = async (search = "") => {
  const response = await api.get("/jobs", {
    params: {
      search,
    },
  });

  return response.data;
};

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);

  return response.data;
};