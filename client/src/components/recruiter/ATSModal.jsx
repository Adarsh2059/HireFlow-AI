import { X } from "lucide-react";

function ATSModal({
  report,
  open,
  onClose,
  onReAnalyze,
  loading,
}) {
  if (!open || !report) return null;

  const {
    jobMatch,
    review,
    summary,
    interviewQuestions,
  } = report;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">

          <h2 className="text-2xl font-bold">
            ATS Report
          </h2>

          <button onClick={onClose}>
            <X size={28} />
          </button>

        </div>

        <div className="space-y-8 p-8">

          {/* Score */}

          <div>

            <h3 className="text-xl font-semibold">
              ATS Score
            </h3>

            <div className="mt-4 h-5 rounded-full bg-slate-200">

              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${jobMatch.matchPercentage}%`,
                }}
              />

            </div>

            <p className="mt-3 text-2xl font-bold text-blue-600">
              {jobMatch.matchPercentage}%
            </p>

          </div>

          {/* Skills */}

          <div className="grid gap-8 md:grid-cols-2">

            <div>

              <h3 className="mb-3 text-lg font-semibold text-green-700">
                Matched Skills
              </h3>

              <ul className="space-y-2">

                {jobMatch.matchedSkills?.map((skill) => (
                  <li key={skill}>
                    ✅ {skill}
                  </li>
                ))}

              </ul>

            </div>

            <div>

              <h3 className="mb-3 text-lg font-semibold text-red-700">
                Missing Skills
              </h3>

              <ul className="space-y-2">

                {jobMatch.missingSkills?.map((skill) => (
                  <li key={skill}>
                    ❌ {skill}
                  </li>
                ))}

              </ul>

            </div>

          </div>

          {/* Summary */}

          <div>

            <h3 className="mb-3 text-xl font-semibold">
              AI Summary
            </h3>

            <p>{summary}</p>

          </div>

          {/* Review */}

          <div className="grid gap-8 md:grid-cols-3">

            <div>

              <h3 className="font-semibold text-green-700">
                Strengths
              </h3>

              <ul className="mt-2 space-y-2">

                {review.strengths?.map((item) => (
                  <li key={item}>• {item}</li>
                ))}

              </ul>

            </div>

            <div>

              <h3 className="font-semibold text-red-700">
                Weaknesses
              </h3>

              <ul className="mt-2 space-y-2">

                {review.weaknesses?.map((item) => (
                  <li key={item}>• {item}</li>
                ))}

              </ul>

            </div>

            <div>

              <h3 className="font-semibold text-blue-700">
                Suggestions
              </h3>

              <ul className="mt-2 space-y-2">

                {review.suggestions?.map((item) => (
                  <li key={item}>• {item}</li>
                ))}

              </ul>

            </div>

          </div>

          {/* Interview Questions */}

          <div>

            <h3 className="mb-5 text-xl font-semibold">
              AI Interview Questions
            </h3>

            {Object.entries(interviewQuestions).map(
              ([section, questions]) => (
                <div
                  key={section}
                  className="mb-6"
                >
                  <h4 className="mb-2 text-lg font-semibold capitalize">
                    {section}
                  </h4>

                  <ul className="space-y-2">

                    {questions.map((q) => (
                      <li key={q}>
                        • {q}
                      </li>
                    ))}

                  </ul>

                </div>
              )
            )}

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4">

            <button
              onClick={onReAnalyze}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              {loading
                ? "Re-Analyzing..."
                : "Re-Analyze"}
            </button>

            <button
              onClick={onClose}
              className="rounded-lg border px-6 py-3"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ATSModal;