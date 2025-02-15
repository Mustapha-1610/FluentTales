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

    const { previous_generations, theme, locale } = await req.json();
    const previousWords = previous_generations.flatMap((gen: any) =>
      gen.map((word: any) => word.word)
    );
    console.log(locale);
    const aiPrompt = `
Generate German vocabulary related to the theme: "${theme}" for German learners.
Include:
- 10 nouns with article (der/die/das), plural form, translation, and an example sentence all translated to : ${locale}
- 10 verbs in infinitive form with translation and an example sentence translated to : ${locale}
- 6 useful phrases related to the theme with translation in this language : ${locale}

**Important Rules:**
- Do NOT include words from the following list: ${
      previousWords.length > 0 ? previousWords.join(", ") : "none"
    }
- If no more new words exist, you may include previous ones, but prioritize new words.
- Ensure all words are thematically relevant.
- Provide grammatically correct example sentences suitable for German learners.
- Format the response as JSON using the exact structure:

{
  "nouns": [
    { "word": "Haus", "article": "das", "plural": "Häuser", "translation": "word translation in this language ${locale}", "example": "Example how to use this noun in german, no need to translate it" }
  ],
  "verbs": [
    { "word": "gehen", "translation": "word translation in this language ${locale}", "example": "Example how to use this verb in german , no need to translate it" }
  ],
  "phrases": [
    { "german": "Wo ist die nächste Bushaltestelle?", "translation": "translation in this language ${locale}" }
  ]
}

Ensure:
- **No Markdown formatting** (only JSON).
- **Correct noun genders (der/die/das)**.
- **Properly conjugated plural forms**.
- **Always generate 10 nouns, 10 verbs, and 6 phrases**.
- **The word field should contain only the word (no article)**.
`;

    const result = await model.generateContent(aiPrompt);
    const response: any = result.response;
    const textResponse = response.candidates[0].content.parts[0].text;

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
