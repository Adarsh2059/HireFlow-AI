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