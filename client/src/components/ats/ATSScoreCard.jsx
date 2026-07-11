function ATSScoreCard({ score = 0 }) {
  return (
    <div className="rounded-xl border bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold">
        ATS Score
      </h2>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            Overall Match
          </span>

          <span className="text-3xl font-bold text-blue-600">
            {score}%
          </span>
        </div>

        <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{
              width: `${score}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ATSScoreCard;