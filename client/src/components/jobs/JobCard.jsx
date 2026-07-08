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

      <p className="mt-1 text-slate-500">
        {job.location}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
          {job.employmentType}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
          {job.experience}
        </span>

      </div>

      <div className="mt-6">

        <Link
          to={`/jobs/${job._id}`}
          className="font-medium text-blue-600 hover:underline"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
}

export default JobCard;