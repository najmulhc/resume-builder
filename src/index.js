// what we want to do first,

import { cleanLatexJunk } from "../utils/cleanJunk.js";
import {  generatePdfFromLatexFile } from "../utils/makePdf.js";
import { trim } from "../utils/trim.js";
import { writeTextFile } from "./file-management/file-io.js";
import generateResumePrompt from "./generate/generator.js";
import { callLlama } from "./hugging-face/call-llama.js";
import extractDetails from "./jd-nlp/getDetails.js";
import extractKeywords from "./jd-nlp/getKeywords.js";

/*
 1. read the jd and generate two(keywords and brief) json files
 2. use all the info(data, template , jd json) to create the final LateX file
*/

await extractDetails();
await extractKeywords();

const prompt = await generateResumePrompt();
const response = await callLlama(prompt);

await writeTextFile("/resume.tex", trim(response));


await generatePdfFromLatexFile('../output/resume.tex', "../output")

cleanLatexJunk('../output')
