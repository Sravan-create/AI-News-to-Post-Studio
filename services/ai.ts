import { ChatOllama } from "@langchain/ollama";
import { z } from "zod";
import { Article, GeneratedContent } from "../types";

// 1. Initialize Ollama
// We point to the default local port. 
const model = new ChatOllama({
  baseUrl: "http://localhost:11434", 
  model: "gemma3:4b", // Ensure you have pulled this model!
  temperature: 0.7,
});

// 2. Define Output Schemas
// Note: Smaller local models sometimes struggle with strict JSON schemas.
// We use a structured prompt to guide them, and Zod to parse if possible.
const generatedContentSchema = z.object({
  hooks: z.array(z.string()).describe("3 engaging hooks"),
  caption: z.string().describe("Instagram caption"),
  imagePrompt: z.string().describe("Image prompt"),
});

const newsSimulationSchema = z.object({
  articles: z.array(z.object({
    title: z.string(),
    source: z.string(),
    snippet: z.string(),
    url: z.string(),
  })),
});

export const generateSocialContent = async (
  topic: string,
  articles: Article[]
): Promise<GeneratedContent> => {
  
  // Bind the schema to the model
  const structuredLlm = model.withStructuredOutput(generatedContentSchema);

  const articleContext = articles
    .map((a, i) => `${i + 1}. ${a.title} - ${a.snippet}`)
    .join("\n");

  const prompt = `
    You are a social media expert.
    Topic: "${topic}"
    
    Based on these articles:
    ${articleContext}

    Generate a JSON object with:
    1. "hooks": Array of 3 short, catchy hooks.
    2. "caption": One Instagram caption (under 280 chars).
    3. "imagePrompt": A text description for an image.
  `;

  try {
    console.log("⏳ Sending request to Ollama...");
    const response = await structuredLlm.invoke(prompt);
    console.log("✅ Ollama responded");
    return response;
  } catch (error) {
    console.error("Ollama Error:", error);
    // Fallback if JSON parsing fails (common with smaller local models)
    throw new Error("Ollama failed to generate valid JSON. Try a larger model or check console.");
  }
};

export const fetchSimulatedNews = async (topic: string): Promise<Article[]> => {
  const structuredLlm = model.withStructuredOutput(newsSimulationSchema);

  const prompt = `
    Generate 6 realistic news headlines about: "${topic}".
    Return valid JSON with an "articles" array.
    Each article must have: title, source, snippet, url.
  `;

  try {
    const response = await structuredLlm.invoke(prompt);
    return response.articles.map(a => ({
      ...a,
      id: crypto.randomUUID(),
      publishedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("News Simulation Error:", error);
    return [];
  }
};