function ATSSummaryCard({
  summary,
}) {
  return (
    <div className="rounded-xl border bg-white p-8 shadow-sm">

      <h2 className="text-xl font-semibold">
        AI Professional Summary
      </h2>

      <p className="mt-6 whitespace-pre-line leading-8 text-slate-600">
        {summary}
      </p>

    </div>
  );
}

export default ATSSummaryCard;