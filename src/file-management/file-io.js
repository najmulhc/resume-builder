import fs from "fs/promises";
import path from "path";

const INPUT_DIR = path.resolve(process.cwd(), "input");
const OUTPUT_DIR = path.resolve(process.cwd(), "output");

// Returns parsed JSON data from a file
export const readJSONFile = async (filename) => {
  const fullPath = path.join(INPUT_DIR, "data", filename);
  const raw = await fs.readFile(fullPath, "utf8");
  return JSON.parse(raw);
};

// Returns raw text data from a file (e.g., job description)
export const readTextFile = async (filepath) => {
  const fullPath = path.join(INPUT_DIR, filepath);
  return await fs.readFile(fullPath, "utf8");
};

// Writes JSON data to output folder (no return)
export const writeJSONFile = async (filename, jsonData) => {
  const fullPath = path.join(INPUT_DIR, "data",  filename);
  const dataString = JSON.stringify(jsonData, null, 2);
  await fs.writeFile(fullPath, dataString, "utf8");
};

// Writes text data to output folder (no return)
export const writeTextFile = async (filename, content) => {
  const fullPath = path.join(OUTPUT_DIR, filename);
  await fs.writeFile(fullPath, content, "utf8");
};

export const readAllTexFiles = async () => {
  const templateDir = path.resolve("input", "templates", "sections");

  const files = await fs.readdir(templateDir);

  const texFiles = files.filter((file) => file.endsWith(".tex"));

  const fileContents = {};

  for (const file of texFiles) {
    const filePath = path.join(templateDir, file);
    const content = await fs.readFile(filePath, "utf-8");

    const fileNameWithoutExt = path.parse(file).name;

    fileContents[fileNameWithoutExt] = content;
  }

  return fileContents;
};
