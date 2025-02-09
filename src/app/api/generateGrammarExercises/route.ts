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

Generate a JSON object with grammar exercises tailored to the specified German level and grammar topic. The output should strictly follow the given JSON structure and contain no extra text. 

**Level:** ${level}  
**Grammar Topic:** ${course}  
**Language for Explanations:** ${locale}  

---

#### **Exercise Types & Format**
- **Fill-in-the-blanks exercises**  
  - A short paragraph or multiple sentences with missing words.
  - Provide multiple answer choices, with one correct and others incorrect but plausible.
  - Include an explanation for why the correct answer is right.

- **Sentence Rearrangement exercises**  
  - Provide jumbled words that form a grammatically correct sentence.  
  - List all valid sentence structures that are possible.  
  - Include an explanation of why the sentence order works grammatically.  

---

### **JSON Response Format**
\`\`\`json
{
  "fill_in_blanks": {
    "story": "A short paragraph or multiple sentences with blank spaces.",
    "blanks": [
      {
        "options": [
          { "text": "correct_option", "is_correct": true, "explanation": "Why it's correct in ${locale}." },
          { "text": "incorrect_option1", "is_correct": false, "explanation": "Why it's incorrect in ${locale}." },
          { "text": "incorrect_option2", "is_correct": false, "explanation": "Why it's incorrect in ${locale}." }
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
\`\`\`

**Important Notes:**  
- Generate at least **5 sentence rearrangement exercises** per request.  
- Ensure that **all words are included** in sentence rearrangement exercises.  
- If multiple valid sentence structures exist, list them under **valid_sentences** instead of showing only one correct answer.  
- Exclude a direct "correct answer" field—evaluate correctness based on user input.  

Return **only valid JSON** without any additional explanations.
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
