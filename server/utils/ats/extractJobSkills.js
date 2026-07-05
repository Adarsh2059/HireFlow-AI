import { SKILL_DICTIONARY } from "../../constants/skills.js";

const normalize = (text = "") =>
  text
    .toLowerCase()
    .replace(/[.+]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const extractJobSkills = (jobDescription = "") => {
  if (!jobDescription) {
    return [];
  }

  const normalizedJD = normalize(jobDescription);

  const detectedSkills = [];

  for (const skillData of SKILL_DICTIONARY) {
    const found = skillData.aliases.some((alias) =>
      normalizedJD.includes(normalize(alias))
    );

    if (found) {
      detectedSkills.push(skillData.skill);
    }
  }

  return [...new Set(detectedSkills)].sort();
};