// /api/generateGrammarExercise.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

    const { level, course, locale } = await req.json();
    // Optionally, you can add an "exerciseLength" parameter if needed.

    const aiPrompt = `
    ### German Grammar Exercise Generator
    Generate a JSON object with the following structure (and no additional text):
    
    {
      "story": "A coherent paragraph (or multiple paragraphs) that is at least two lines longer than the previous example, containing several ___ placeholders where blanks should be filled in for a grammar exercise. The text must maintain a consistent context and storyline from beginning to end, without abrupt topic changes.",
      "blanks": [
        {
          "options": [
            { "text": "option1", "is_correct": true or false, "explanation": "A detailed explanation in ${locale} explaining why this option is correct, including grammatical reasoning and context-specific details." },
            { "text": "option2", "is_correct": true or false, "explanation": "A detailed explanation in ${locale}." },
            { "text": "option3", "is_correct": true or false, "explanation": "A detailed explanation in ${locale}." }
            // Optionally include more options if it makes sense for the exercise.
          ],
          "explanation": "A comprehensive explanation in ${locale} describing the grammatical rule, the context of the sentence, and why the correct option is correct compared to the incorrect ones."
        }
        // Generate at least 8 such blank objects if the context allows, or more if it fits naturally.
      ]
    }
    
    Generate a German grammar exercise for learners at level ${level} on the topic "${course}". **Important:** 
    - Use only vocabulary, grammar structures, and expressions that are appropriate and common for level ${level}.
    - Ensure the exercise text is engaging and at least two lines longer than previous examples.
    - Maintain a consistent context throughout the entire generation.
    - **Handling Separable Verbs:**  
      If the exercise involves a separable verb (e.g., "einkaufen"), split the verb into two distinct blanks.  
      *Example:*  
      For "einkaufen":  
      - The first blank should expect the core part, e.g., "kaufen".  
      - The second blank should expect the separable prefix, e.g., "ein".  
      Ensure that no single blank contains both parts, and that the answer options and explanations reflect this split precisely.
    - Each blank's answer options should include detailed, specific explanations that reference the relevant grammatical rule and context.
    - You may deviate from the exact example structure if it benefits the overall context, but follow the overall JSON format.
    
    Return valid JSON only.
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
