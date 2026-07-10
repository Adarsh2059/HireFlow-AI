import ATSScoreCard from "./ATSScoreCard";
import ATSSkillsCard from "./ATSSkillsCard";
import ATSSummaryCard from "./ATSSummaryCard";
import ATSReviewCard from "./ATSReviewCard";
import ATSInterviewCard from "./ATSInterviewCard";

function ATSFullReport({ report }) {
  if (!report) return null;

  return (
    <div className="space-y-8">

      <ATSScoreCard
        jobMatch={report.jobMatch}
      />

      <ATSSkillsCard
        analysis={report.analysis}
        jobMatch={report.jobMatch}
      />

      <ATSSummaryCard
        summary={report.summary}
      />

      <ATSReviewCard
        review={report.review}
      />

      <ATSInterviewCard
        interviewQuestions={
          report.interviewQuestions
        }
      />

    </div>
  );
}

export default ATSFullReport;