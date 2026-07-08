import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import JobCard from "../../components/recruiter/JobCard";

import { getRecruiterJobs } from "../../services/recruiterService";

function MyJobs() {
  const [jobs, setJobs] =
    useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {

      const data =
        await getRecruiterJobs();

      setJobs(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-3xl font-bold">
        My Jobs
      </h1>

      <div className="grid gap-6 md:grid-cols-2">

        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
          />
        ))}

      </div>

    </DashboardLayout>
  );
}

export default MyJobs;