 export function trim(mdString) {
  return mdString
    .replace(/^```latex\s*/i, "") // remove opening ```latex
    .replace(/```$/, "") // remove closing ```
    .trim();
}


