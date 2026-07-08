import api from "../axios";

export const uploadResume = async (file, onUploadProgress) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post(
    "/resume/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      onUploadProgress,
    }
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const deleteResume = async () => {
  const response = await api.delete("/resume");

  return response.data;
};