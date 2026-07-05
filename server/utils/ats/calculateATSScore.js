export const calculateATSScore = ({
  contact,
  profile,
  education,
  experience,
  projects,
  skills,
}) => {

  let score = 0;

  const breakdown = {};

  // -----------------------
  // Contact (10)
  // -----------------------

  let contactScore = 0;

  if (contact.email) contactScore += 3;
  if (contact.phone) contactScore += 3;
  if (contact.github) contactScore += 2;
  if (contact.linkedin) contactScore += 2;

  breakdown.contact = contactScore;
  score += contactScore;

  // -----------------------
  // Profile (10)
  // -----------------------

  let profileScore = 0;

  if (profile.hasProfile)
    profileScore = Math.min(
      10,
      Math.floor(profile.wordCount / 10)
    );

  breakdown.profile = profileScore;
  score += profileScore;

  // -----------------------
  // Education (15)
  // -----------------------

  breakdown.education = Math.min(
    education.score,
    15
  );

  score += breakdown.education;

  // -----------------------
  // Experience (20)
  // -----------------------

  breakdown.experience = Math.min(
    experience.experienceScore,
    20
  );

  score += breakdown.experience;

  // -----------------------
  // Projects (20)
  // -----------------------

  let projectScore = 0;

  if (projects.totalProjects > 0) {
    projectScore += Math.min(
      projects.totalProjects * 5,
      10
    );

    if (projects.strongestProject) {
      projectScore += Math.min(
        projects.strongestProject.score,
        10
      );
    }
  }

  breakdown.projects = projectScore;
  score += projectScore;

  // -----------------------
  // Skills (25)
  // -----------------------

  const skillScore =
    Math.min(skills.length * 2, 25);

  breakdown.skills = skillScore;

  score += skillScore;

  return {

    score,

    breakdown,

    percentage: score,

  };

};