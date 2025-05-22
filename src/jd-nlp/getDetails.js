import { readTextFile, writeJSONFile } from "../file-management/file-io.js";
import { parseJsonFromBackticks } from "../file-management/parseJson.js";
import { callLlama } from "../hugging-face/call-llama.js";

export const extractDetails = async () => {
  const jobDescription = await readTextFile("/job-description.txt");
  const promptTemplate = (jobText) => `
You are an expert in parsing job descriptions.

Your task is to extract structured data from the following raw job description.
Respond ONLY in a valid JSON object, matching the following structure:

{
  "companyName": "",
  "companyWebsite": "",
  "roleTitle": "",
  "workLocation": "",
  "workMode": "",
  "salaryRange": "",
  "officeHours": "",
  "requiredExperience": "",
  "responsibilities": [],
  "requirements": [],
  "bonusPoints": [],
  "perksAndBenefits": []
}

Here's the raw job description:

"""
${jobText}
"""

I repeat ONLY reponse the JSON object, nothing else is needed
`;

  const prompt = promptTemplate(jobDescription);

  const reponse =  await callLlama(prompt);

  const parsedJson = parseJsonFromBackticks(reponse);

  await writeJSONFile("/details.json", parsedJson);
};


export default extractDetails;
