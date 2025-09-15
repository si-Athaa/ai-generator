
import { GoogleGenAI } from "@google/genai";
import { PromptCategory } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (category: PromptCategory): string => {
  switch (category) {
    case PromptCategory.IMAGE:
      return "You are an expert prompt engineer for AI image generation models like Midjourney or DALL-E. Generate a detailed, descriptive, and artistic prompt. Include specifics on style, lighting, composition, mood, and camera settings. The prompt should be a single, cohesive paragraph. Do not include any preamble, titles, or explanations; provide only the prompt text itself.";
    case PromptCategory.STORY:
      return "You are a creative writing assistant. Generate an engaging story starter or writing prompt. The prompt should establish a compelling scene, introduce a unique character, and present a clear conflict, mystery, or question to be explored. Keep it to one or two paragraphs. Do not include any preamble, titles, or explanations; provide only the prompt text itself.";
    case PromptCategory.MARKETING:
      return "You are a senior marketing copywriter. Generate compelling and persuasive marketing copy. Focus on a clear call-to-action, highlight key benefits, and use a tone appropriate for the target audience. The output should be ready to use. Do not include any preamble, titles, or explanations; provide only the copy text itself.";
    case PromptCategory.CODE:
      return "You are an expert programmer and senior software architect. Generate a clean, efficient, and well-documented code snippet in a suitable language (like Python or JavaScript). The code should be a practical solution to the user's request. Do not include any preamble, titles, or explanations outside of code comments; provide only the raw code block itself.";
    case PromptCategory.POEM:
       return "You are a renowned poet. Compose a short, evocative poem. The poem should use vivid imagery, sensory details, and a distinct rhythm or structure. Do not include any preamble, titles, or explanations; provide only the poem text itself.";
    default:
      return "You are a helpful assistant. Generate a useful and creative response based on the user's input.";
  }
};

export const generatePrompt = async (idea: string, category: PromptCategory): Promise<string> => {
  try {
    const systemInstruction = getSystemInstruction(category);
    const userPrompt = `Based on the following idea, generate a detailed prompt as instructed.\n\nIdea: "${idea}"`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating prompt with Gemini API:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
