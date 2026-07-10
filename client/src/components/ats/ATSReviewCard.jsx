function ATSReviewCard({ review }) {
  if (!review) return null;

  const ReviewSection = ({
    title,
    data,
    color,
  }) => (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h3 className={`mb-4 text-lg font-semibold ${color}`}>
        {title}
      </h3>

      {data?.length ? (
        <ul className="space-y-2 list-disc pl-5">
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">
          No data available.
        </p>
      )}

    </div>
  );

  return (
    <div className="space-y-6">

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="text-2xl font-bold">
          AI Resume Review
        </h2>

        <p className="mt-3">
          <span className="font-semibold">
            Overall Rating:
          </span>{" "}
          {review.overallRating}
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <ReviewSection
          title="Strengths"
          data={review.strengths}
          color="text-green-600"
        />

        <ReviewSection
          title="Weaknesses"
          data={review.weaknesses}
          color="text-red-600"
        />

        <ReviewSection
          title="Suggestions"
          data={review.suggestions}
          color="text-blue-600"
        />

      </div>

    </div>
  );
}

export default ATSReviewCard;