import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDTOsMfUo-IznRUOdQLevnHEIKwZIKYlfk");

export const generatePitch = async (idea) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are an AI startup pitch generator.
User idea: "${idea}"

Generate a clean JSON object with the following keys only:
startupName, tagline, pitch, targetAudience, colorPaletteIdea
Do not include markdown or code fences. Just return pure JSON.
`;

  const result = await model.generateContent(prompt);
  const rawText = await result.response.text();

  // 🧹 Clean the response to remove any extra backticks or 'json' words
  const cleanText = rawText
    .replace(/```json|```/g, "") // remove markdown fences
    .trim();

  try {
    return JSON.parse(cleanText);
  } catch (err) {
    console.error("JSON Parse Error:", err, "\nRaw response:", cleanText);
    // Fallback: return text as plain string if parsing fails
    return { startupName: "Error", tagline: "Invalid JSON format", pitch: cleanText };
  }
};
