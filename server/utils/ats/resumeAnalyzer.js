import { extractSections } from "./extractSections.js";

import { extractSkills } from "./extractSkills.js";

import { analyzeContact } from "./analyzers/contactAnalyzer.js";
import { analyzeProfile } from "./analyzers/profileAnalyzer.js";
import { analyzeEducation } from "./analyzers/educationAnalyzer.js";
import { analyzeExperience } from "./analyzers/experienceAnalyzer.js";
import { analyzeProjects } from "./analyzers/projectAnalyzer.js";
import { calculateATSScore } from "./calculateATSScore.js";
import { generateFeedback } from "./generateFeedback.js";

export const analyzeResume = (resumeText = "") => {

  // Split Resume
  const sections = extractSections(resumeText);

  // Analyze Individual Sections
  const contact =
    analyzeContact(sections.contact);

  const profile =
    analyzeProfile(sections.profile);

  const education =
    analyzeEducation(sections.education);

  const experience =
    analyzeExperience(sections.experience);

  const projects =
    analyzeProjects(sections.projects);

  // Extract Skills from Entire Resume
  const skills =
    extractSkills(resumeText);

const ats = calculateATSScore({
  contact,
  profile,
  education,
  experience,
  projects,
  skills,
});

const feedback = generateFeedback({
  contact,
  profile,
  education,
  experience,
  projects,
  skills,
});

  return {

    sections,

    contact,

    profile,

    education,

    experience,

    projects,

    skills,

    ats,

    feedback,

  };

};