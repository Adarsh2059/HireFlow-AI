function ATSReportView({ report }) {
  if (!report) return null;

  return (
    <div className="space-y-8">
      {/* ATS Score */}
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">ATS Score</h2>

        <div className="mt-6 h-5 rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{
              width: `${report.score || 0}%`,
            }}
          />
        </div>

        <p className="mt-4 text-4xl font-bold text-blue-600">
          {report.score || 0}%
        </p>
      </div>

      {/* Skills */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-green-600">
            Matched Skills
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {report.matchedSkills?.length ? (
              report.matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-green-100 px-4 py-2 text-green-700"
                >
                  ✓ {skill}
                </span>
              ))
            ) : (
              <p className="text-slate-500">No matched skills.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-red-600">
            Missing Skills
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {report.missingSkills?.length ? (
              report.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-red-100 px-4 py-2 text-red-700"
                >
                  ✕ {skill}
                </span>
              ))
            ) : (
              <p className="text-slate-500">No missing skills.</p>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">AI Summary</h2>

        <p className="mt-5 whitespace-pre-line leading-8">
          {report.summary}
        </p>
      </div>

      {/* Candidate Analysis */}
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">
          Candidate Analysis
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Skills */}

          <div>
            <h3 className="font-semibold text-lg">
              Skills
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {report.candidateAnalysis?.skills?.map((skill) => (
                <span
                  key={skill}
                  className="rounded bg-slate-100 px-3 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}

          <div>
            <h3 className="font-semibold text-lg">
              Experience
            </h3>

            {report.candidateAnalysis?.experience?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {report.candidateAnalysis.experience.map((exp, index) => (
                  <li key={index}>
                    {typeof exp === "string"
                      ? exp
                      : JSON.stringify(exp)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-slate-500">
                No experience found.
              </p>
            )}
          </div>

          {/* Education */}

          <div>
            <h3 className="font-semibold text-lg">
              Education
            </h3>

            <div className="mt-4 space-y-4">
              {report.candidateAnalysis?.education?.length ? (
                report.candidateAnalysis.education.map((edu, index) => (
                  <div
                    key={edu._id || index}
                    className="rounded-lg border p-4"
                  >
                    <h4 className="font-semibold">
                      {edu.degree}
                    </h4>

                    <p>{edu.institution}</p>

                    <p className="text-sm text-slate-500">
                      {edu.dates}
                    </p>

                    {edu.details && (
                      <p className="mt-2 text-sm text-slate-600">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  No education found.
                </p>
              )}
            </div>
          </div>

          {/* Projects */}

          <div>
            <h3 className="font-semibold text-lg">
              Projects
            </h3>

            <div className="mt-4 space-y-4">
              {report.candidateAnalysis?.projects?.length ? (
                report.candidateAnalysis.projects.map(
                  (project, index) => (
                    <div
                      key={project._id || index}
                      className="rounded-lg border p-4"
                    >
                      <h4 className="font-semibold">
                        {project.title}
                      </h4>

                      <p className="mt-2 text-slate-600">
                        {project.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="rounded bg-slate-100 px-2 py-1 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="text-slate-500">
                  No projects found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review */}

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Strengths",
            color: "text-green-600",
            data: report.review?.strengths,
          },
          {
            title: "Weaknesses",
            color: "text-red-600",
            data: report.review?.weaknesses,
          },
          {
            title: "Suggestions",
            color: "text-blue-600",
            data: report.review?.suggestions,
          },
        ].map((section) => (
          <div
            key={section.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <h3 className={`font-semibold ${section.color}`}>
              {section.title}
            </h3>

            <ul className="mt-4 list-disc space-y-2 pl-5">
              {section.data?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Interview Questions */}

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">
          Interview Questions
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {Object.entries(report.interviewQuestions || {}).map(
            ([category, questions]) => (
              <div key={category}>
                <h3 className="mb-4 text-lg font-semibold capitalize">
                  {category}
                </h3>

                <ul className="list-disc space-y-2 pl-5">
                  {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ATSReportView;