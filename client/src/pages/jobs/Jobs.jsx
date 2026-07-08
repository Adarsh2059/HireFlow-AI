import { useEffect, useState } from "react";

import CandidateLayout from "../../layouts/CandidateLayout";

import JobCard from "../../components/jobs/JobCard";
import JobSearch from "../../components/jobs/JobSearch";

import { getJobs } from "../../services/jobService";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] =
    useState("");

  const fetchJobs = async () => {
    const response =
      await getJobs(search);

    setJobs(response.data.jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, [search]);

  return (
    <CandidateLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Jobs
          </h1>

          <p className="mt-2 text-slate-500">
            Browse opportunities.
          </p>

        </div>

        <JobSearch
          search={search}
          setSearch={setSearch}
        />

        <div className="grid gap-6 lg:grid-cols-2">

          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))}

        </div>

      </div>

    </CandidateLayout>
  );
}

export default Jobs;