export const analyzeEducation = (resumeText = "") => {
  const text = resumeText.toLowerCase();

  // Degree Patterns
  const degreeRegex =
    /(b\.?tech|bachelor of technology|b\.?e|be|m\.?tech|master of technology|mca|bca|bsc|msc|phd|doctorate)/i;

  // College / University
  const instituteRegex = /(university|college|institute|iit|nit)/i;

  // CGPA
  const cgpaRegex =
    /(\d+(\.\d+)?)\s*(cgpa|gpa)|(cgpa|gpa)\s*[:\-]?\s*(\d+(\.\d+)?)/i;

  // Graduation Year
  const yearRegex = /(19|20)\d{2}/g;

  const degree = resumeText.match(degreeRegex);
  const cgpa = resumeText.match(cgpaRegex);

const cgpaValue = cgpa
  ? cgpa[1] || cgpa[5]
  : null;
  const years = resumeText.match(yearRegex);

  const hasInstitute = instituteRegex.test(text);

  let score = 0;

  if (degree) score += 4;

  if (hasInstitute) score += 3;

  if (cgpa) score += 2;

  if (years?.length) score += 1;

  return {
    hasEducation: score > 0,

    degree: degree ? degree[0] : null,

    institute: hasInstitute,

    cgpa: cgpaValue,

    graduationYear:
years
  ? Math.max(...years.map(Number)).toString()
  : null,

    score,
  };
};
