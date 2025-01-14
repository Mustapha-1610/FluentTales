import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyBRHhtmff5YjTuxslWbc8wc5Q2UJO9TSYM"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const aiPrompt = `
Generate a medium-length story based on the following filters:

- Language: {english}
- Genre: {adventure}
- Length : {Medium}
- Language Level : {A1}
- Target Audience: {children}
- Theme: {nature}

Output the results in valid JSON format as specified below.Make sure to generate 4 exercises compared to the 1st example, Do not include any additional text or commentary outside the JSON object, Ensure the story's length corresponds to the specified category:

- Short: The text should be between 300-600 words
- Medium: The text should be between 700-1000 words
- Long: The text should be between 1100-1400 words
{
  "story": "The generated story text here.",
  "exercises": [
    {
      "question": "Comprehension question 1?",
      "answers": [
        {"text": "Answer option 1", "is_correct": false},
        {"text": "Answer option 2", "is_correct": true},
        {"text": "Answer option 3", "is_correct": false}
      ]
    },
  ]
}

Ensure the story is engaging, professional, and matches the specified filters. The exercises must accurately reflect the content of the story, be grammatically correct, and suitable for the specified language and audience. Prioritize clarity, professionalism, and clean formatting in the JSON output.
`;

    const result = await model.generateContent(aiPrompt, {
      temperature: 0.7,
      topP: 0.9,
    });
    const response = await result.response;
    const textResponse = response.candidates[0].content.parts[0].text;

    // Clean the response string to remove unwanted backticks or extra text
    const cleanedTextResponse = textResponse
      .replace(/```json/g, "") // Remove opening backticks with 'json'
      .replace(/```/g, "") // Remove closing backticks
      .trim(); // Remove leading and trailing spaces

    // Parse the cleaned string into a JSON object
    const jsonResponse = JSON.parse(cleanedTextResponse);

    console.log("Parsed JSON:", jsonResponse);

    return NextResponse.json({ success: true, data: jsonResponse });
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json({ error: "Error processing the AI response" });
  }
}
