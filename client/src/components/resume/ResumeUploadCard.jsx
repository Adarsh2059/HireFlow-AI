import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

import { uploadResume } from "../../services/resumeService";

function ResumeUploadCard({
  refreshUser,
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    try {
      setUploading(true);

      const file = acceptedFiles[0];

      await uploadResume(file, (event) => {
        const percent = Math.round(
          (event.loaded * 100) / event.total
        );
        setProgress(percent);
      });
      
      await refreshUser();

      toast.success("Resume uploaded successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const { getRootProps, getInputProps } =
    useDropzone({
      onDrop,

      accept: {
        "application/pdf": [".pdf"],
      },

      multiple: false,
    });

  return (
    <div className="rounded-xl bg-white p-8 shadow-sm border">

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 transition"
      >

        <input {...getInputProps()} />

        <UploadCloud
          className="mx-auto text-slate-500"
          size={60}
        />

        <h2 className="mt-6 text-xl font-semibold">
          {uploading
            ? `Uploading ${progress}%`
            : "Drag & Drop Resume"}
        </h2>

        <p className="mt-2 text-slate-500">
          {uploading
            ? "Please wait..."
            : "or click to browse your PDF"}
        </p>

      </div>

    </div>
  );
}

export default ResumeUploadCard;