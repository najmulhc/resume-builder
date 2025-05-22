import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs/promises";

const execPromise = promisify(exec);

/**
 * Generate a PDF from a .tex file.
 * @param {string} texFilePath - Path to the .tex file.
 * @param {string} [outputDir] - Optional output directory. Defaults to same dir as .tex file.
 * @returns {Promise<string>} - Path to the generated PDF.
 */
export async function generatePdfFromLatexFile(texFilePath, outputDir) {
  try {
    // Resolve output dir, default to same dir as texFilePath
    const resolvedOutputDir = outputDir
      ? path.resolve(outputDir)
      : path.dirname(path.resolve(texFilePath));

    // Make sure output directory exists
    await fs.mkdir(resolvedOutputDir, { recursive: true });

    // Resolve absolute paths and wrap in quotes to handle spaces
    const absTexFilePath = "D:/Desktop/resume-builder/output/resume.tex";
    const absOutputDir = "D:/Desktop/resume-builder/output"

    // Run pdflatex with quoted paths
    const command = `pdflatex -interaction=nonstopmode -output-directory="${absOutputDir}" "${absTexFilePath}"`;

    console.log("Running command:", command);

    const { stdout, stderr } = await execPromise(command);

    if (stderr) console.warn("⚠️ pdflatex stderr:", stderr);
    console.log("✅ PDF generated at:", path.join(absOutputDir, "resume.pdf"));

    return path.join(absOutputDir, "resume.pdf");
  } catch (err) {
    console.error("❌ Failed to generate PDF:", err);
    throw err;
  }
}
