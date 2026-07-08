import ai from "../config/gemini.js";

export const generateContent = async (
  prompt,
  parseJson = true
) => {
  try {
    console.log("Sending request to Gemini...");

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    const text = response.text.trim();

    const cleaned = text
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    if (!parseJson) {
      return cleaned;
    }

    return JSON.parse(cleaned);

  } catch (error) {

    if (
      error.status === 429 ||
      error.message?.includes("RESOURCE_EXHAUSTED")
    ) {
      throw new Error(
        "Gemini API quota exceeded. Please try again later."
      );
    }

    throw error;
  }
};

export const generateATSReport = async ({
  analysis,
  jobMatch,
  jobDescription,
}) => {

  // Reduce prompt size before sending to Gemini
  const candidate = {
  skills: analysis.skills,

  education: analysis.education,

  experience: analysis.experience,

  totalProjects:
    analysis.projects?.totalProjects || 0,

  strongestProject:
    analysis.projects?.strongestProject?.title ||
    analysis.projects?.strongestProject?.name ||
    "N/A",
};

  const ats = {
  score: jobMatch.matchPercentage,

  matchedSkills: jobMatch.matchedSkills,

  missingSkills: jobMatch.missingSkills,
};

  const prompt = `
You are an experienced Senior Technical Recruiter and ATS Expert.

You will receive:

1. Candidate Information
2. ATS Matching Result
3. Job Description

Your job is to produce ONE ATS Report.

Return ONLY valid JSON.

{
  "summary":"",

  "review":{
      "overallRating":"",
      "strengths":[],
      "weaknesses":[],
      "suggestions":[]
  },

  "interviewQuestions":{

      "technical":[],
      "projectBased":[],
      "behavioral":[],
      "hr":[]
  }

}

Candidate:

${JSON.stringify(candidate)}

ATS:

${JSON.stringify(ats)}

Job:

${jobDescription}
`;

  return await generateContent(prompt);
};