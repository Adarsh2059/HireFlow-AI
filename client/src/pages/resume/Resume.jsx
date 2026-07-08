import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import ResumeUploadCard from "../../components/resume/ResumeUploadCard";
import ResumeInfoCard from "../../components/resume/ResumeInfoCard";

import {
  getCurrentUser,
} from "../../services/resumeService";

function Resume() {

  const [user, setUser] = useState(null);

  const fetchUser = async () => {

    const response =
      await getCurrentUser();

    setUser(response.data);

  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Resume
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your resume.
          </p>

        </div>

        {user?.resumeUrl ? (
          <ResumeInfoCard
            user={user}
            refreshUser={fetchUser}
          />
        ) : (
          <ResumeUploadCard
            refreshUser={fetchUser}
          />
        )}

      </div>

    </DashboardLayout>
  );
}

export default Resume;