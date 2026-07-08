function DashboardStatCard({
  title,
  value,
  icon,
}) {
  const Icon = icon;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        {Icon && (
          <div className="rounded-full bg-blue-100 p-3">
            <Icon
              size={26}
              className="text-blue-600"
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default DashboardStatCard;