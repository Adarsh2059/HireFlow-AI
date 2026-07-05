import { SKILL_DICTIONARY } from "../../constants/skills.js";

const normalize = (text = "") =>
  text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const escapeRegex = (text) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const extractSkills = (resumeText = "") => {
  if (!resumeText) return [];

  const normalizedResume = normalize(resumeText);

  const detectedSkills = [];

  for (const skillData of SKILL_DICTIONARY) {

    const found = skillData.aliases.some((alias) => {

      const normalizedAlias = normalize(alias);

      const regex = new RegExp(
        `\\b${escapeRegex(normalizedAlias)}\\b`,
        "i"
      );

      return regex.test(normalizedResume);

    });

    if (found) {
      detectedSkills.push(skillData.skill);
    }
  }

  return [...new Set(detectedSkills)].sort();
};