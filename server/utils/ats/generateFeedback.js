export const generateFeedback = ({
  contact,
  profile,
  education,
  experience,
  projects,
  skills,
}) => {

  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  // Contact
  if (contact.email && contact.phone)
    strengths.push(
      "Contact information is complete."
    );

  if (!contact.linkedin) {
    weaknesses.push(
      "LinkedIn profile is missing."
    );

    suggestions.push(
      "Add your LinkedIn profile URL."
    );
  }

  if (!contact.github) {
    weaknesses.push(
      "GitHub profile is missing."
    );

    suggestions.push(
      "Add your GitHub profile URL."
    );
  }

  // Profile
  if (profile.hasProfile)
    strengths.push(
      "Professional summary is present."
    );
  else {
    weaknesses.push(
      "Professional summary is missing."
    );

    suggestions.push(
      "Add a concise professional summary."
    );
  }

  // Education
  if (education.hasEducation)
    strengths.push(
      "Education details are well provided."
    );

  // Experience
  if (experience.hasExperience)
    strengths.push(
      "Relevant work experience found."
    );
  else {
    weaknesses.push(
      "No work experience detected."
    );

    suggestions.push(
      "Include internships, freelance work, or major projects."
    );
  }

  // Projects
  if (projects.totalProjects >= 2)
    strengths.push(
      "Multiple projects strengthen your resume."
    );

  if (projects.projects.some(project => !project.github)) {
    suggestions.push(
      "Add GitHub links for your projects."
    );
  }

  if (projects.projects.some(project => !project.liveDemo)) {
    suggestions.push(
      "Include live demo links where applicable."
    );
  }

  // Skills
  if (skills.length >= 10)
    strengths.push(
      "Good variety of technical skills."
    );

  return {
    strengths,
    weaknesses,
    suggestions,
  };

};