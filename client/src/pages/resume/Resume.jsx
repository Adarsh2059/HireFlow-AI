import DashboardLayout from "../../layouts/DashboardLayout";
import ResumeUploadCard from "../../components/resume/ResumeUploadCard";

function Resume() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Resume
          </h1>

          <p className="mt-2 text-slate-500">
            Upload and manage your resume for ATS analysis and AI interview preparation.
          </p>
        </div>

        <ResumeUploadCard />

      </div>
    </DashboardLayout>
  );
}

export default Resume;