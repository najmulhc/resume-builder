export const  parseJsonFromBackticks = (rawString) =>  {
  // Remove leading/trailing ``` (with optional language tags)
  const trimmed = rawString.replace(/^```(\w+)?\n/, "").replace(/```$/, "");

  try {
    const obj = JSON.parse(trimmed);
    return obj;
  } catch (err) {
    console.error("Invalid JSON input:", err);
    return null;
  }
}
