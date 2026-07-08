import { Link } from "react-router-dom";
import { Pencil, Trash2, Users } from "lucide-react";

function RecruiterJobCard({
  job,
  onDelete,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            {job.title}
          </h2>

          <p className="mt-2 text-slate-500">
            {job.company}
          </p>

          <p className="text-slate-500">
            {job.location}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            job.status === "Open"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {job.status}
        </span>

      </div>

      <div className="mt-5 flex flex-wrap gap-2">

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
          {job.employmentType}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
          {job.experience}
        </span>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          ₹ {job.salary}
        </span>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <Link
          to={`/recruiter/jobs/${job._id}/applicants`}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Users size={18} />

          Applicants
        </Link>

        <Link
          to={`/recruiter/jobs/edit/${job._id}`}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-50"
        >
          <Pencil size={18} />

          Edit
        </Link>

        <button
          onClick={() => onDelete(job._id)}
          className="flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50"
        >
          <Trash2 size={18} />

          Delete
        </button>

      </div>

    </div>
  );
}

export default RecruiterJobCard;