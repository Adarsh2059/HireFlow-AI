import api from "../axios";

export const generateATS = async (
  jobId,
  candidateId = null
) => {
  const response = await api.post(
    `/ats/analyze/${jobId}`,
    {},
    {
      params: candidateId
        ? { candidateId }
        : {},
    }
  );

  return response.data;
};

export const getATSReport = async (
  jobId,
  candidateId = null
) => {
  const response = await api.get(
    `/ats/report/${jobId}`,
    {
      params: candidateId
        ? { candidateId }
        : {},
    }
  );

  return response.data;
};

export const reAnalyzeATS = async (
  jobId,
  candidateId = null
) => {
  const response = await api.post(
    `/ats/reanalyze/${jobId}`,
    {},
    {
      params: candidateId
        ? { candidateId }
        : {},
    }
  );

  return response.data;
};

export const getATSStatus = async (
  jobId,
  candidateId = null
) => {
  const response = await api.get(
    `/ats/status/${jobId}`,
    {
      params: candidateId
        ? { candidateId }
        : {},
    }
  );

  return response.data;
};