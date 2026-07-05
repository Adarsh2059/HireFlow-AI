export const analyzeProfile = (resumeText = "") => {

  const cleaned = resumeText.trim();

  return {
    hasProfile: cleaned.length > 30,
    wordCount: cleaned
      ? cleaned.split(/\s+/).length
      : 0,
  };

};