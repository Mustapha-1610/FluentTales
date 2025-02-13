import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Interface for expected request body
interface AnalysisRequest {
  language: string;
  text: string;
  level: string;
}

// Validation function
const validateRequest = (body: Partial<AnalysisRequest>) => {
  if (!body.text || body.text.length < 300) {
    return "Text must be at least 300 characters";
  }
  if (!body.level || !["A1", "A2", "B1", "B2"].includes(body.level)) {
    return "Invalid German level";
  }
  if (!body.language) return "Language is required";
  return null;
};

export async function POST(req: Request) {
  try {
    const { language, text, level } = (await req.json()) as AnalysisRequest;

    // Validate request
    const validationError = validateRequest({ language, text, level });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY!);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINIMODEL || "gemini-pro",
      generationConfig: { temperature: 0.7, topP: 0.9 },
    });

    const perfectionCheckPrompt = `
Briefly analyze this German text written by a ${level} level learner:
${text}

Answer ONLY with "YES" or "NO" - Is this text perfect for the learner's level with no errors?
`;

    // First check for perfection
    const perfectionCheck = await model.generateContent(perfectionCheckPrompt);
    const isPerfect =
      perfectionCheck.response.text().trim().toUpperCase() === "YES";

    if (isPerfect) {
      return NextResponse.json({
        generalReview: `🌟 Perfect text! Great job for ${level} level! (translated to ${language})`,
        grammarTips: [],
        missingWords: [],
      });
    }

    // Full analysis prompt with improved criticism
    const analysisPrompt = `
Analyze this German text written by a ${level} level learner:
${text}

Provide a response in ${language}:

1. **General Review** (3-4 sentences):
   - Be direct and honest. If the text does not meet the expected level, say so.
   - If the vocabulary is too simple or does not fit ${level} level, mention it.
   - If sentences are too short or lack complexity, point it out.
   - If the text is well-written but could be improved, explain how.
   - Avoid excessive praise. Only highlight strengths if they genuinely exist.

2. **3-5 Specific Grammar Mistakes (if applicable)**:
   - Only include real mistakes from the text.
   - Explain errors clearly with simple corrections suitable for ${level} level.
   - If the grammar is fine but sentence structure is poor, mention it.

3. **3-5 Missing or Weak Words (if applicable)**:
   - If words are missing or the vocabulary is too basic, suggest improvements.
   - Highlight places where stronger expressions or more advanced structures could be used.
   - Focus on making the text sound natural for ${level} level.

### **Format the response as JSON:**
{
  "generalReview": "string",
  "grammarTips": [
    { "title": "string", "description": "string" }
  ],
  "missingWords": [
    { "word": "string", "suggestion": "string" }
  ]
}

### **Rules:**
- **Be constructive but critical**—do not sugarcoat errors.
- **Do not invent mistakes**, but point out real weaknesses.
- **If the text is too basic for ${level}, say so and explain why.**
- **Ensure explanations are clear and appropriate for ${level} learners.**
- **Provide helpful suggestions for improvement.**
- **Response must be in ${language}.**
`;

    const result = await model.generateContent(analysisPrompt);
    const rawResponse = result.response.text();

    // Safer JSON cleaning
    const cleanedResponse = rawResponse
      .replace(/(```json|```)/gi, "")
      .replace(/^json\s*/i, "")
      .trim();

    // Validate JSON structure
    const analysis = JSON.parse(cleanedResponse);
    if (!analysis.generalReview || !Array.isArray(analysis.grammarTips)) {
      throw new Error("Invalid analysis format");
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze text. Please try again." },
      { status: 500 }
    );
  }
}
