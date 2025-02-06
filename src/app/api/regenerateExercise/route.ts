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
    //
    const { context, previousExercises } = await req.json();

    const aiPrompt = `
Generate a new set of 4 German exercises based on the following information:

- Context/Theme: ${context}
- Previous Exercises: ${previousExercises}

Ensure the new exercises are different from the previous ones provided. The correct answer positions in the new exercises must be different from the previous exercises. Output the results in valid JSON format as specified below. Do not include any additional text or commentary outside the JSON object:

{
  "exercises": [
    {
      "question": "Comprehension question 1?",
      "answers": [
        {"text": "Answer option 1", "is_correct": true},
        {"text": "Answer option 2", "is_correct": true},
        {"text": "Answer option 3", "is_correct": true}
      ]
    },
    ...
  ]
}

The exercises must accurately reflect the content, be grammatically correct. Prioritize clarity, professionalism, and clean formatting in the JSON output.

### Additional Notes:
1. Only generate 4 exercises.
2. Make sure the correct answer is varied among the 3 options. The correct answer position can only be repeated twice.
3. Ensure the correct answer positions are different from the previous exercises to prevent repetition.
4. The correct answer position must be varied. Specifically:
   - Each correct answer position (1, 2, 3) should be used maximum twice.
   - The same correct answer position should not appear consecutively more than twice.

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
