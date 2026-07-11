import ai from "../config/gemini.js";

export const generateContent = async (prompt, parseJson = true) => {
  try {

    const response = await ai.models.generateContent({
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

    const parsed = JSON.parse(cleaned);


    return parsed;
  } catch (error) {
    if (error.status === 429 || error.message?.includes("RESOURCE_EXHAUSTED")) {
      throw new Error("Gemini API quota exceeded. Please try again later.");
    }

    throw error;
  }
};

export const generateATSReport = async ({ resumeText, jobDescription }) => {
  const prompt = `
You are an expert Applicant Tracking System (ATS), Senior Technical Recruiter, and Software Engineering Interviewer.

Your task is to analyze the candidate's resume ONLY using the provided resume and job description.

IMPORTANT RULES:

- Never invent or infer information.
- Never guess missing skills.
- Never fabricate education or experience.
- Never assume projects that are not explicitly mentioned.
- If a field is unavailable, return an empty array or an empty string.
- ATS score must be an integer between 0 and 100.
- matchedSkills must contain only skills present in BOTH the resume and job description.
- missingSkills must contain only required job skills missing from the resume.
- Return ONLY valid JSON.
- Do not include markdown.
- Do not wrap the JSON inside \`\`\`.

Return exactly this structure:

{
  "score": 0,

  "matchedSkills": [],

  "missingSkills": [],

  "summary": "",

  "review": {
    "overallRating": "",
    "strengths": [],
    "weaknesses": [],
    "suggestions": []
  },

  "candidate": {

    "skills": [],

    "education": [
      {
        "institution": "",
        "degree": "",
        "dates": "",
        "details": ""
      }
    ],

    "experience": [
      {
        "company": "",
        "role": "",
        "duration": "",
        "description": ""
      }
    ],

    "projects": [
      {
        "title": "",
        "description": "",
        "technologies": []
      }
    ]
  },

  "interviewQuestions": {

    "technical": [],

    "projectBased": [],

    "behavioral": [],

    "hr": []

  }

}

Resume:

${resumeText}

Job Description:

${jobDescription}
`;

  return await generateContent(prompt);
};
