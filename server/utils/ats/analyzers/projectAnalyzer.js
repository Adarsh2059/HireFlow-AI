import { extractSkills } from "../extractSkills.js";

export const analyzeProjects = (projectsSection = "") => {
  const lines = projectsSection
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const projects = [];

  let currentProject = null;

  const titleRegex = /^.+(\[.*?\]|\|\s*project\s*link)/i;

  for (const line of lines) {
    if (titleRegex.test(line)) {
      if (currentProject) {
        projects.push(currentProject);
      }

      currentProject = {
        title: line
          .replace(/\[.*?\]/g, "")
          .replace(/\|\s*project\s*link/i, "")
          .trim(),

        description: "",
      };

      continue;
    }

    if (currentProject) {
      currentProject.description += line + " ";
    }
  }

  if (currentProject) {
    projects.push(currentProject);
  }

  for (const project of projects) {
    project.technologies = extractSkills(project.description);

    project.github = /github\.com/i.test(project.description);

    project.liveDemo = /(vercel|netlify|render|railway)/i.test(
      project.description,
    );

    const projectText = `${project.title} ${project.description}`;

    project.aiProject =
      /(machine learning|artificial intelligence|generative ai|ai-powered|llm|computer vision|nlp|gemini)/i.test(
        projectText,
      );

    let score = 0;

    if (project.description.length > 80) score += 3;

    if (project.technologies.length) score += 5;

    if (project.github) score += 2;

    if (project.liveDemo) score += 2;

    if (project.aiProject) score += 3;

    project.score = score;
  }

  const strongestProject = projects.length
    ? [...projects].sort((a, b) => b.score - a.score)[0]
    : null;

  return {
    hasProjects: projects.length > 0,

    totalProjects: projects.length,

    strongestProject,

    averageScore: projects.length
      ? Number(
          (projects.reduce((s, p) => s + p.score, 0) / projects.length).toFixed(
            1,
          ),
        )
      : 0,

    projects,
  };
};
