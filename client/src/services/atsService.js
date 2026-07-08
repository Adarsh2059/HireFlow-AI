import api from "../axios";

export const generateATS = async (jobId) => {
  const response = await api.post(
    `/ats/analyze/${jobId}`
  );

  return response.data;
};

export const getATSReport = async (jobId) => {
  const response = await api.get(
    `/ats/report/${jobId}`
  );

  return response.data;
};

export const reAnalyzeATS = async (jobId) => {
  const response = await api.post(
    `/ats/reanalyze/${jobId}`
  );

  return response.data;
};

export const getATSStatus = async (
  jobId
) => {

  const response =
    await api.get(
      `/ats/status/${jobId}`
    );

  return response.data;

};