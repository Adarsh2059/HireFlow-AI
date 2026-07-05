const SECTION_HEADINGS = {
  profile: [
    "summary",
    "professional summary",
    "profile summary",
    "objective",
    "career objective",
    "profile",
    "about me",
  ],

  skills: [
    "skills",
    "technical skills",
    "technical proficiencies",
  ],

  education: [
    "education",
    "academic background",
    "academics",
    "qualification",
  ],

  experience: [
    "experience",
    "work experience",
    "professional experience",
    "employment history",
    "internship",
    "internships",
  ],

  projects: [
    "projects",
    "personal projects",
    "academic projects",
  ],

  certifications: [
    "certifications",
    "certificates",
    "licenses",
  ],

  achievements: [
    "achievements",
    "awards",
    "honors",
  ],
};

export const extractSections = (resumeText = "") => {

  const sections = {
    contact: "",
    profile: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    certifications: "",
    achievements: "",
  };

  const lines = resumeText
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  let currentSection = "contact";

  for (const line of lines) {

    const normalized = line
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

    let foundSection = null;

    for (const [section, headings] of Object.entries(SECTION_HEADINGS)) {

      const isHeading = headings.some(
        heading =>
          heading
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim() === normalized
      );

      if (isHeading) {
        foundSection = section;
        break;
      }
    }

    if (foundSection) {
      currentSection = foundSection;
      continue;
    }

    sections[currentSection] += line + "\n";
  }

  return sections;

};