import { readTextFile, writeJSONFile } from "../file-management/file-io.js";
import { parseJsonFromBackticks } from "../file-management/parseJson.js";
import { callLlama } from "../hugging-face/call-llama.js";

export const extractKeywords = async () => {
  const jobDescription = await readTextFile("/job-description.txt");

  const promptTemplate = (jobText) => `
You are an expert technical recruiter and NLP specialist.

Your task is to extract the most relevant and high-impact keywords from the following job description. Group them into categories for use in resume optimization. Avoid duplicates and irrelevant terms.

Respond ONLY in the following JSON structure:

{
  "technologies": [],
  "tools": [],
  "skills": [],
  "soft_skills": [],
  "cloud_providers": [],
  "bonus_keywords": []
}

Here is the raw job description:

"""
${jobText}
"""

ONLY return a valid JSON. No extra explanation or notes.
`;

  const prompt = promptTemplate(jobDescription);

  const response = await callLlama(prompt);

  const parsedJson = parseJsonFromBackticks(response);

  await writeJSONFile("/keywords.json", parsedJson);
};

export default extractKeywords;
