function StatusBadge({ status }) {
  const styles = {
    Applied:
      "bg-blue-100 text-blue-700",

    Screening:
      "bg-yellow-100 text-yellow-700",

    Shortlisted:
      "bg-purple-100 text-purple-700",

    Interview:
      "bg-indigo-100 text-indigo-700",

    Selected:
      "bg-cyan-100 text-cyan-700",

    Hired:
      "bg-green-100 text-green-700",

    Rejected:
      "bg-red-100 text-red-700",

    Withdrawn:
      "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[status] ||
        "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;