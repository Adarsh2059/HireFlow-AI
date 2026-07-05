export const calculateSkillMatch = (
  resumeSkills = [],
  jobSkills = []
) => {
  // Remove duplicates
  const resumeSet = new Set(resumeSkills);
  const jobSet = new Set(jobSkills);

  // Skills present in both
  const matchedSkills = [...resumeSet].filter((skill) =>
    jobSet.has(skill)
  );

  // Skills required but missing
  const missingSkills = [...jobSet].filter(
    (skill) => !resumeSet.has(skill)
  );

  // Skills candidate has but job doesn't require
  const extraSkills = [...resumeSet].filter(
    (skill) => !jobSet.has(skill)
  );

  // Match %
  const matchPercentage =
    jobSet.size === 0
      ? 100
      : Number(
          (
            (matchedSkills.length / jobSet.size) *
            100
          ).toFixed(2)
        );

  return {
    matchedSkills,
    missingSkills,
    extraSkills,
    matchPercentage,
  };
};