import { FileText } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

import {
  uploadResume,
  deleteResume,
} from "../../services/resumeService";

import ConfirmModal from "../common/ConfirmModal";

function ResumeInfoCard({
  user,
  refreshUser,
}) {
  const [uploading, setUploading] = useState(false);

  const [openModal, setOpenModal] =
    useState(false);

  const handleDelete = async () => {
    try {
      await deleteResume();

      toast.success("Resume deleted");

      await refreshUser();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    try {
      setUploading(true);

      await uploadResume(
        acceptedFiles[0]
      );

      toast.success(
        "Resume replaced successfully"
      );

      await refreshUser();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Replace failed"
      );
    } finally {
      setUploading(false);
    }
  };

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <>
      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <div className="flex items-center gap-4">

          <FileText
            size={42}
            className="text-blue-600"
          />

          <div>
            <h2 className="text-2xl font-semibold">
              Resume Uploaded
            </h2>

            <p className="text-slate-500">
              Your resume is ready for ATS analysis.
            </p>
          </div>

        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">

          <div>
            <p className="text-sm text-slate-500">
              Uploaded On
            </p>

            <p className="font-medium text-slate-800">
              {user.resumeUploadedAt
                ? new Date(
                    user.resumeUploadedAt
                  ).toLocaleDateString()
                : "--"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <p className="font-medium text-green-600">
              Ready for ATS Analysis
            </p>
          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-4">

          <a
            href={user.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            View Resume
          </a>

          <button
            {...getRootProps()}
            disabled={uploading}
            className="rounded-lg border px-5 py-2 transition hover:bg-slate-100"
          >
            <input {...getInputProps()} />

            {uploading
              ? "Replacing..."
              : "Replace Resume"}
          </button>

          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
          >
            Delete Resume
          </button>

        </div>

      </div>

      <ConfirmModal
        open={openModal}
        title="Delete Resume"
        message="Are you sure you want to delete your resume? This action cannot be undone."
        onCancel={() =>
          setOpenModal(false)
        }
        onConfirm={async () => {
          setOpenModal(false);

          await handleDelete();
        }}
      />
    </>
  );
}

export default ResumeInfoCard;