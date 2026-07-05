import { extractJobSkills } from "./extractJobSkills.js";
import { calculateSkillMatch } from "./calculateSkillMatch.js";

export const matchResumeToJob = (
  resumeSkills = [],
  jobDescription = ""
) => {

  const jobSkills =
    extractJobSkills(jobDescription);

  const skillMatch =
    calculateSkillMatch(
      resumeSkills,
      jobSkills
    );

  return {

    jobSkills,

    matchedSkills:
      skillMatch.matchedSkills,

    missingSkills:
      skillMatch.missingSkills,

    extraSkills:
      resumeSkills.filter(
        skill =>
          !jobSkills.includes(skill)
      ),

    matchPercentage:
      skillMatch.matchPercentage,

  };

};