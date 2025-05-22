import fs from "fs";
import path from "path";

export function cleanLatexJunk(directory) {
  const junkExtensions = [".aux", ".log", ".out", ".toc" , ".tex"];

  fs.readdirSync(directory).forEach((file) => {
    const ext = path.extname(file);
    if (junkExtensions.includes(ext)) {
      fs.unlinkSync(path.join(directory, file));
    }
  });
}
