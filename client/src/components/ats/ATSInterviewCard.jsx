function ATSInterviewCard({
  interviewQuestions,
}) {
  if (!interviewQuestions) return null;

  const QuestionCard = ({
    title,
    questions = [],
  }) => (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        {title}
      </h3>

      {questions.length ? (
        <ol className="list-decimal space-y-2 pl-5">
          {questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ol>
      ) : (
        <p className="text-slate-500">
          No questions generated.
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        AI Interview Questions
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <QuestionCard
          title="Technical"
          questions={interviewQuestions.technical}
        />

        <QuestionCard
          title="Project Based"
          questions={interviewQuestions.projectBased}
        />

        <QuestionCard
          title="Behavioral"
          questions={interviewQuestions.behavioral}
        />

        <QuestionCard
          title="HR"
          questions={interviewQuestions.hr}
        />
      </div>
    </div>
  );
}

export default ATSInterviewCard;