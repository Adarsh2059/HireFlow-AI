function ATSSkillsCard({
  matchedSkills = [],
  missingSkills = [],
  candidateAnalysis,
}) {
  return (
    <div className="space-y-6">

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-blue-600">
          Candidate Skills
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">
          {candidateAnalysis?.skills?.length ? (
            candidateAnalysis.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-100 px-4 py-2 text-blue-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-slate-500">
              No skills detected.
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-green-600">
            Matched Skills
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {matchedSkills.length ? (
              matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-green-100 px-4 py-2 text-green-700"
                >
                  ✓ {skill}
                </span>
              ))
            ) : (
              <p className="text-slate-500">
                No matched skills.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-red-600">
            Missing Skills
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {missingSkills.length ? (
              missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-red-100 px-4 py-2 text-red-700"
                >
                  ✕ {skill}
                </span>
              ))
            ) : (
              <p className="text-slate-500">
                No missing skills.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ATSSkillsCard;