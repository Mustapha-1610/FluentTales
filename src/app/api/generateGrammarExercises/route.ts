// /api/generateGrammarExercise.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY!);

    const model = genAI.getGenerativeModel({
      model: String(process.env.GEMINIMODEL!),
      generationConfig: {
        temperature: 0.1,
        topP: 0.2,
        responseMimeType: "application/json",
      },
    });

    const { level, course, locale } = await req.json();

    const aiPrompt = `
    ### German Grammar Exercise Generator
    Generate a JSON object with the following structure (and no additional text):
    
    {
    "fill_in_blanks": {
    "story": "A short paragraph or multiple sentences with blank spaces but don't add numbers to the spaces just spaces like this '___'.",
    "blanks": [
      {
        "options": [
          { "text": "correct_option", "is_correct": true" },
          { "text": "incorrect_option1", "is_correct": false" },
          { "text": "incorrect_option2", "is_correct": false" }
        ],
        "explanation": "Detailed grammar explanation in ${locale}."
      }
    ]
  },
    "sentence_rearrangement": [
    {
      "jumbled_words": ["word1", "word2", "word3"],
      "valid_sentences": [
        "Correct sentence variation 1.",
        "Correct sentence variation 2."
      ],
    }
  ]
}
    
    Generate German grammar exercises for learners at the german level : ${level}, on the grammar course "${course}". **Important:** 
    - Use only vocabulary, grammar structures, and expressions that are appropriate and common for level ${level}.

    Here are some tips for generating the fill-in-the-blank exercises:
    - Ensure the exercise text is engaging and long enough atleast 400 charecters.
    - include atleast 7 blanks and options.
    - Maintain a consistent context throughout the entire generation.
    - If the exercise involves separable verbs (for example, "einkaufen"), then split the verb into two separate blanks (one for the prefix and one for the main verb) at the appropriate positions in the sentence for example first blank has kaufen and second one has ein like in trennbare verbs.
    - Each blank's answer options should include a proper explanation, just enough to explain why that is the correct answer but not too short.
    - You may deviate from the exact example structure if it benefits the context; be flexible while following the overall JSON format.
    
    Here is some tips for generating the sentence rearrangement exercises:
    - Always Generate 6 sentence rearrangement exercises.
    - Provide jumbled words that form a grammatically correct sentence.
    - List all valid sentence structures that are possible.  
    - Ensure that all words from the valid sentences are included in sentence rearrangement exercises and don't create sentances ending with points or ? or ! or anything just normal words that you also include in the jumbled words.  
    - for the jumbled words don't give out fake words or words that are not in the valid sentences.

    When generating you can take your time just make sure you analyze the propmpt and respect all the rules i layed out before generating anything so you make sure the output follows all rules and restrictions.
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
