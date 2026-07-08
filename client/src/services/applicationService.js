import api from "../axios";

export const applyJob = async (jobId) => {
  const response = await api.post(
    `/applications/${jobId}`
  );

  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get(
    "/applications/my-applications"
  );

  return response.data;
};

export const withdrawApplication = async (
  applicationId
) => {
  const response = await api.patch(
    `/applications/${applicationId}/withdraw`
  );

  return response.data;
};