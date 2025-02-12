import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY!);
    const model = genAI.getGenerativeModel({
      model: String(process.env.GEMINIMODEL!),
      generationConfig: {
        temperature: 0.9,
        topP: 0.9,
      },
    });

    const { previous_generation, theme, locale } = await req.json();

    const aiPrompt = `
Generate German vocabulary related to the theme: "${theme}" for german learners.
Include:
- 10 nouns with article (der/die/das), plural form, translation in this language : ${locale}, and example sentence
- 10 verbs in infinitive form with translation in this language : ${locale} and example sentence
- 6 useful phrases related to the theme with translation in this language : ${locale}

Format output as JSON exactly following this structure:
{
  "nouns": [
    {
      "word": "Haus",
      "article": "das",
      "plural": "Häuser",
      "translation": "house",
      "example": "Das Haus ist groß."
    }
  ],
  "verbs": [
    {
      "word": "gehen",
      "translation": "to go",
      "example": "Ich gehe zur Schule."
    }
  ],
  "phrases": [
    {
      "german": "Wo ist die nächste Bushaltestelle?",
      "translation": "Where is the nearest bus stop?"
    }
  ]
}

Ensure:
- All words/phrases are relevant to the theme
- Examples use simple grammar appropriate for most german level's
- No markdown formatting, only valid JSON
- Gender articles are exactly der/die/das
- Plural forms are correctly spelled
- always generate 6 phrases, 10 verbs and phrases
- when you generate the word generate it alone without its article leave the article for its proper json variable
- if there is a previous generation in this varible : ${previous_generation} different then null, then try to generate newer things different then it if possible.
`;

    const result = await model.generateContent(aiPrompt);
    const response: any = result.response;
    const textResponse = response.candidates[0].content.parts[0].text;

    // Clean and parse response
    const cleanedResponse = textResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonResponse = JSON.parse(cleanedResponse);
    return NextResponse.json({ success: true, data: jsonResponse });
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json({ error: "Error generating vocabulary" });
  }
}
