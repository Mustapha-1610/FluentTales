// /api/generateGrammarExercise.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyBRHhtmff5YjTuxslWbc8wc5Q2UJO9TSYM"
    );
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // or your chosen model
      generationConfig: {
        temperature: 0.9,
        topP: 0.9,
      },
    });

    const { level, course, locale } = await req.json();
    // Optionally, you can add an "exerciseLength" parameter if needed.

    const aiPrompt = `
### German Grammar Exercise Generator
Generate a JSON object with the following structure (and no additional text):

{
  "story": "A coherent paragraph with several ___ placeholders indicating blanks for a grammar exercise.",
  "blanks": [
    {
      "options": [
        { "text": "option1", "is_correct": true or false, "explanation": "Explanation text in ${locale}" },
        { "text": "option2", "is_correct": true or false, "explanation": "Explanation text in ${locale}" },
        { "text": "option3", "is_correct": true or false, "explanation": "Explanation text in ${locale}" }
      ],
      "explanation": "A generic explanation for why the correct answer is correct, written in ${locale}."
    },
    ... (include at least 6 such blanks)
  ]
}

Generate a German grammar exercise for learners at level ${level} on the topic "${course}". **Important:** Use only vocabulary, grammar structures, and expressions that are appropriate and common for level ${level}. The exercise must use simple, everyday words for beginners if ${level} is A1 (or corresponding vocabulary for other levels) and ensure that the examples and dropdown options reflect this level-appropriate language. The exercise should be longer than the usual example (with at least 6 blanks), present a realistic and engaging context, and all explanation texts must be in the language corresponding to the locale: ${locale}. Return valid JSON only.
`;

    const result = await model.generateContent(aiPrompt);
    const response: any = result.response;
    const textResponse = response.candidates[0].content.parts[0].text;

    // Remove any markdown formatting if present:
    const cleanedTextResponse = textResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const jsonResponse = JSON.parse(cleanedTextResponse);

    return NextResponse.json({ success: true, data: jsonResponse });
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json({ error: "Error processing AI response" });
  }
}
