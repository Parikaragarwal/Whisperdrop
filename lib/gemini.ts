import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function runGemini(prompt: string) {
    try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
} catch (error) {
    console.error("Error running Gemini:", error);
    throw new Error("Failed to get response from AI");
}
}