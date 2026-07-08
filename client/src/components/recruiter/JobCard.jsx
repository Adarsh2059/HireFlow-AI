import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        {job.title}
      </h2>

      <p className="mt-2 text-slate-500">
        {job.company}
      </p>

      <p className="mt-2 text-sm">
        {job.location}
      </p>

      <div className="mt-6">
        <Link
          to={`/recruiter/jobs/${job._id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          View Applicants
        </Link>
      </div>

    </div>
  );
}

export default JobCard;