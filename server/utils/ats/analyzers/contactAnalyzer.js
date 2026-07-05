export const analyzeContact = (resumeText = "") => {
  const emailRegex =
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i;

  const phoneRegex =
    /(\+?\d{1,3}[- ]?)?\d{10}/;

  const githubRegex =
    /github\.com\/[A-Za-z0-9_-]+/i;

  const linkedinRegex =
    /linkedin\.com\/in\/[A-Za-z0-9_-]+/i;

  const portfolioRegex =
    /(https?:\/\/)?([A-Za-z0-9-]+\.)?(vercel\.app|netlify\.app|github\.io)/i;

  return {
    email: emailRegex.test(resumeText),
    phone: phoneRegex.test(resumeText),
    github: githubRegex.test(resumeText),
    linkedin: linkedinRegex.test(resumeText),
    portfolio: portfolioRegex.test(resumeText),
  };
};