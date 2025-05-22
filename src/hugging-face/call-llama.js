import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;

if (!HF_API_KEY) {
  throw new Error("Missing HF_API_KEY in environment variables");
}

const client = new InferenceClient(HF_API_KEY);



export const callLlama = async (prompt, options = {} ) => {
  const {

    temperature = 0.7,
    max_tokens = 1024,

  } = options;

  try {
    const response = await client.chatCompletion({
      model: "meta-llama/Llama-3.3-70B-Instruct",
      messages: [{ role: "user", content: prompt }],
      temperature,

      max_tokens,
    });

    const message = response.choices?.[0]?.message?.content;
    if (!message) throw new Error("No content returned from LLaMA");

    return message.trim();
  } catch (err) {
    console.error("🔥 Error in callLlama():", err.message);
    throw err;
  }
};
