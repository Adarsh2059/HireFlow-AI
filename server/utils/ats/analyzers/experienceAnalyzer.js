export const analyzeExperience = (resumeText = "") => {
  const lines = resumeText
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const experiences = [];

  const durationRegex =
    /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}\s*[-–]\s*((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}|present)/i;

  const roleRegex =
    /(intern|developer|engineer|consultant|designer|analyst|manager|associate|trainee)/i;

  for (let i = 0; i < lines.length; i++) {

    if (durationRegex.test(lines[i])) {

      const duration = lines[i];

      const role =
        i >= 2 ? lines[i - 2] : null;

      const company =
        i >= 1 ? lines[i - 1] : null;

      const description = [];

      let j = i + 1;

      while (
        j < lines.length &&
        !durationRegex.test(lines[j])
      ) {

        description.push(lines[j]);

        j++;
      }

      experiences.push({

        role,

        company,

        duration,

        description,

      });

    }

  }

  const internships =
    experiences.filter(exp =>
      roleRegex.test(exp.role ?? "")
    ).length;

  let score = 0;

  if (experiences.length) score += 4;

  if (
    experiences.some(exp => exp.company)
  ) {
    score += 2;
  }

  if (
    experiences.some(exp => exp.duration)
  ) {
    score += 2;
  }

  if (
    experiences.some(exp => exp.description.length)
  ) {
    score += 2;
  }

  return {

    hasExperience:
      experiences.length > 0,

    experiences,

    internships,

    experienceScore: score,

  };

};