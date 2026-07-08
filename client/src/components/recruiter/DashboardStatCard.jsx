function DashboardStatCard({
  title,
  value,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-4 text-3xl font-bold text-slate-800">
        {value}
      </h2>
    </div>
  );
}

export default DashboardStatCard;