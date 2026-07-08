function ATSSkillsCard({
  analysis,
  jobMatch,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <h2 className="text-xl font-semibold text-green-600">
          Matched Skills
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">

          {jobMatch.matchedSkills.map(
            (skill) => (
              <span
                key={skill}
                className="rounded-full bg-green-100 px-4 py-2 text-green-700"
              >
                ✓ {skill}
              </span>
            )
          )}

        </div>

      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <h2 className="text-xl font-semibold text-red-600">
          Missing Skills
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">

          {jobMatch.missingSkills.map(
            (skill) => (
              <span
                key={skill}
                className="rounded-full bg-red-100 px-4 py-2 text-red-700"
              >
                ✕ {skill}
              </span>
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default ATSSkillsCard;