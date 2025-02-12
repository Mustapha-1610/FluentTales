import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY!);

    const model = genAI.getGenerativeModel({
      model: String(process.env.GEMINIMODEL!),
      generationConfig: {
        temperature: 0.8,
        topP: 0.2,
      },
    });
    //
    const { context, previousExercises } = await req.json();

    const aiPrompt = `Generate a new set of German exercises based on the following theme:
- **Context/Theme**: ${context}
- **Previous Exercises**: ${previousExercises}

#### **Exercise Requirements**
1. **Comprehension Questions (4 total)**:
   - Each question should have **three answer choices**.
   - Only **one answer is correct**, but its position should vary across questions.
   - The two incorrect answers should be plausible but clearly wrong.

2. **True/False Statements (6 total)**:
   - The mix of True and False answers should **vary randomly in each generation**.
   - Make sure there are always atleast 3 answers that are true and 3 that are false but they should be randomly distributed.
  
   #### **Output Format (JSON)**
\`\`\`json
{
  "comprehension_exercises": [
    {
      "question": "Sample question?",
      "answers": [
        { "text": "Answer 1", "is_correct": false },
        { "text": "Answer 2", "is_correct": true },
        { "text": "Answer 3", "is_correct": false }
      ]
    },
    ...
  ],
  "true_false_exercises": [
    {
      "statement": "Sample statement based on the story.",
      "is_true": true or false
    },
    ...
  ]
}
  \`\`\`
Ensure proper grammar and clarity in both questions and answers.
No additional text or formatting outside the JSON response.

 `;

    const result = await model.generateContent(aiPrompt);
    const response: any = result.response;
    const textResponse = response.candidates[0].content.parts[0].text;

    // Clean the response string to remove unwanted backticks or extra text
    const cleanedTextResponse = textResponse
      .replace(/```json/g, "") // Remove opening backticks with 'json'
      .replace(/```/g, "") // Remove closing backticks
      .trim(); // Remove leading and trailing spaces

    // Parse the cleaned string into a JSON object
    const jsonResponse = JSON.parse(cleanedTextResponse);

    return NextResponse.json({ success: true, data: jsonResponse });
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json({ error: "Error processing the AI response" });
  }
}
