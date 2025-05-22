import { readJSONFile, readAllTexFiles } from "../file-management/file-io.js";

/**
 * Generate the full LaTeX resume prompt for the AI to generate the final document.
 * Includes candidate data, JD, keywords, and modular LaTeX templates.
 */
export const generateResumePrompt = async () => {
  // 🧠 Load candidate data
  const basicInfo = await readJSONFile("/basics.json");
  const certifications = await readJSONFile("/certification.json");
  const skills = await readJSONFile("/skills.json");
  const projects = await readJSONFile("/projects.json");
  const education = await readJSONFile("/education.json");

  const candidateData = {
    basics: basicInfo,
    certifications,
    skills,
    projects,
    education,
  };

  // 🏢 Load job description data
  const jdDetails = await readJSONFile("/details.json");
  const jdKeywords = await readJSONFile("/keywords.json");

  // 📦 Load modular LaTeX template files
  const templateParts = await readAllTexFiles();

  const combinedTemplate = Object.entries(templateParts)
    .map(([filename, content]) => `%% ${filename} %%\n${content}`)
    .join("\n\n");

  // 📜 Generate the mega prompt
  // 📜 Generate the mega prompt
  const prompt = `
You are a professional LaTeX resume writer and ATS optimization specialist.

🎯 TASK:
Generate a **single-page, ATS-optimized resume in LaTeX** based on the following inputs.

-------------------------
📥 INPUTS:

1. 🧠 CANDIDATE DATA:
\`\`\`json
${JSON.stringify(candidateData, null, 2)}
\`\`\`

2. 🏢 JOB DESCRIPTION DETAILS:
\`\`\`json
${JSON.stringify(jdDetails, null, 2)}
\`\`\`

3. 🔍 EXTRACTED KEYWORDS:
\`\`\`json
${JSON.stringify(jdKeywords, null, 2)}
\`\`\`

4. 📄 LATEX TEMPLATE STRUCTURE (follow this strictly):
\`\`\`tex
${combinedTemplate}
\`\`\`

-------------------------
📌 MUST-FOLLOW RULES:

1. 🚫 **DO NOT** add any technology, framework, or tool that is not present in the candidate data — even if it's in the JD. Only use JD/keywords for phrasing or structuring, not to fabricate content.

2. 📐 Follow this section order **exactly**:
   - Career Objective (always first)
   - Skills (second, no exception)
   - Projects (short, impactful)
   - Education
   - Additional/Certifications (if applicable)

3. 🧠 The **Career Objective** must:
   - Be tailored to the job title and domain from the JD.
   - Use keywords *only* if relevant to the candidate’s profile.
   - Be professional, concise, and ATS-optimized.
   - Avoid filler or generic phrases or mentioning the company name.

4. 📌 The **Skills** section:
   - Must always be placed **immediately after** the Career Objective.
   - Should be organized clearly by categories (e.g., Languages, Frameworks, Tools).
   - Only include the relevent skills as per the job information provided(NO extra tools , frameworks not be included).

5. 🛠️ The **Projects** section:
   - Limit each project description to **maximum 4 lines**.
   - Use concise bullets.
   - Prioritize **action verbs**, quantifiable results, and relevant keywords.

6. 🎓 Education & Other:
   - Keep concise, consistent formatting.
   - Remove any section not relevant to the JD or not included in the candidate data.

7. ⚠️ PRESERVE formatting and spacing:
   - Keep proper LaTeX line breaks, \`\\vspace\`, and structural elements intact.
   - Don’t let LaTeX formatting break due to JSON injections or whitespace errors.

-------------------------
📤 FINAL OUTPUT:

- Output ONLY the LaTeX code for the resume.
- No extra commentary, notes, or explanation.
- Begin with:
  \`\\documentclass{resume}\`
- End with:
  \`\\end{document}\`

`.trim();


  console.log(prompt);

  return prompt;
};

export default generateResumePrompt;
