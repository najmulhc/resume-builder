import fs from "fs";
import path from "path";

/**
 * Reads a single .tex file from the /input/templates directory.
 * Throws an error if the file doesn't exist or isn't a .tex file.
 *
 * @param {string} filename - Just the filename (e.g., 'header.tex')
 * @returns {string} - Raw LaTeX content of the file
 */
export function readLatexFile(filename) {
  const templatesDir = path.resolve("input", "templates");
  const fullPath = path.join(templatesDir, filename);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`LaTeX file not found in /input/templates: ${filename}`);
  }

  if (!filename.endsWith(".tex")) {
    throw new Error(`Invalid file type: ${filename} is not a .tex file`);
  }

  const content = fs.readFileSync(fullPath, "utf8");
  return content;
}
