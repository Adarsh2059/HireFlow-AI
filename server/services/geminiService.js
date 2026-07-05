import ai from "../config/gemini.js";

export const generateContent = async (prompt) => {

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

  return JSON.parse(cleaned);
};

export const generateResumeSummary = async (analysis) => {

  const prompt = `
You are an experienced technical recruiter.

Based on the following structured resume analysis, write a professional summary in 120-150 words.

Requirements:
- Professional tone.
- Highlight strengths.
- Mention education.
- Mention technical skills.
- Mention best projects.
- Do not invent information.
- Return only the summary.

Resume Analysis:

${JSON.stringify(analysis, null, 2)}
`;

  return await generateContent(prompt);

};

export const generateResumeReview = async ({
  analysis,
  jobMatch,
}) => {

  const prompt = `
You are a senior technical recruiter.

You are provided with:

1. ATS Resume Analysis
2. Resume vs Job Match

Your task is to evaluate the resume professionally.

Rules:

- Do NOT invent information.
- Base every point on the provided analysis.
- Give constructive feedback.
- Keep it concise.
- Return ONLY valid JSON.

Return exactly in this format:

{
  "overallRating": "",
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Resume Analysis:

${JSON.stringify(analysis, null, 2)}

Job Match:

${JSON.stringify(jobMatch, null, 2)}
`;

  return await generateContent(prompt);

};

export const generateInterviewQuestions = async ({
  analysis,
  jobDescription,
}) => {

  const prompt = `
You are a Senior Software Engineering Interviewer.

Based on the candidate analysis and job description, generate interview questions.

Requirements:

- Return ONLY valid JSON.
- Do not invent candidate skills.
- Questions must match the candidate profile.

Return exactly:

{
  "technical": [],
  "projectBased": [],
  "behavioral": [],
  "hr": []
}

Candidate Analysis:

${JSON.stringify(analysis, null, 2)}

Job Description:

${jobDescription}
`;

  return await generateContent(prompt);

};