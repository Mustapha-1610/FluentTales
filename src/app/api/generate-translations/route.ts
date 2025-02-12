import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY!);

    const { text, targetLanguage } = await req.json();

    // Input validation
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid text. Please provide a valid selection." },
        { status: 400 }
      );
    }

    if (text.length > 150) {
      return NextResponse.json(
        { error: "Selected text is too long. Please select a shorter text." },
        { status: 400 }
      );
    }

    if (!targetLanguage || typeof targetLanguage !== "string") {
      return NextResponse.json(
        { error: "Target language is required." },
        { status: 400 }
      );
    }

    // AI prompt
    const prompt = `
### Translation and Example Generator
Translate the following German text into the specified target language. Then, provide an example sentence using the translated text. Return the result in JSON format.

#### Input:
- German Text: "${text}"
- Target Language: "${targetLanguage}"

#### Output Format:
\`\`\`json
{
  "translation": "Translated text here",
  "exampleSentence": "An example sentence using the translated text here."
}
\`\`\`

#### Guidelines:
- Ensure the translation is accurate and natural.
- For the example sentence, ensure it is grammatically correct and fits the target language's cultural context.
- Do not include any unnecessary explanations or text outside the JSON format.
`;

    const model = genAI.getGenerativeModel({
      model: String(process.env.GEMINIMODEL!),
      generationConfig: {
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const result = await model.generateContent(prompt);
    const response: any = result.response;

    // Extract response and parse JSON
    const aiResponse = response.candidates[0].content.parts[0].text;
    const jsonResponse = JSON.parse(
      aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
    );

    return NextResponse.json(jsonResponse);
  } catch (err: any) {
    console.error("Error generating translation:", err.message);
    return NextResponse.json(
      { error: "Failed to generate translation. Please try again later." },
      { status: 500 }
    );
  }
}
