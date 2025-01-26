import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyBRHhtmff5YjTuxslWbc8wc5Q2UJO9TSYM"
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.9,
        topP: 0.9,
      },
    });

    const {
      generationLength,
      grammarLevel,
      languageLevel,
      targetAudience,
      context,
    } = await req.json();
    const aiPrompt = `
### Story and Exercise Generator
Generate a German story and corresponding exercises based on the following parameters:

#### Parameters:
- **Context/Theme**: ${context}
- **Story Length**: ${generationLength} (Options: short: 300-700 words, medium: 800-1100 words, long: 2000-2300 words)
- **Language Level**: ${languageLevel} (e.g., A1, A2, B1)
- **Target Audience**: ${targetAudience}
- **Grammar Level**: ${grammarLevel} 

#### Story Requirements:
1. **Engaging Narrative**:
   - Write an engaging and fluid story tailored to the specified audience.
   - Avoid overly simplistic or robotic language; instead, use dynamic and diverse sentence structures.
   - Include vivid descriptions, realistic dialogues, and immersive settings.

2. **Professional Style**:
   - Ensure the tone is professional yet relatable for the target audience.
   - Avoid repetitive phrases or excessive punctuation.

3. **Creative Variations**:
   - Alternate between narrative perspectives (e.g., first-person, third-person).
   - Use diverse genres (e.g., mystery, adventure, humor) and introduce unexpected twists or decisions.

#### Exercise Requirements:
- Generate 4 exercises that reflect the storys content.
- Exercises must include comprehension questions with **three answer options** each:
  - One correct answer (varied in position across questions to avoid patterns).
  - Two incorrect but plausible answers.

#### Output Format:
Return the result in **valid JSON** with the following structure:
\`\`\`json
{
  "story": "Generated story text.",
  "exercises": [
    {
      "question": "Comprehension question?",
      "answers": [
        { "text": "Answer 1", "is_correct": false },
        { "text": "Answer 2", "is_correct": true },
        { "text": "Answer 3", "is_correct": false }
      ]
    },
    ...
  ]
}
\`\`\`

#### Additional Guidelines:
1. **Exercise Quality**:
   - Ensure questions and answers are grammatically accurate and level-appropriate.
   - Avoid predictable patterns in correct answer positions (e.g., no consecutive correct answers in the same position).
   - Respect word minimum count for each story length parameter as the options suggest
   
2. **Clean Formatting**:
   - Return a well-structured and clean JSON output.
   - Avoid including any additional text or formatting outside the specified JSON structure.
    `;

    const result = await model.generateContent(aiPrompt);

    const response: any = result.response;
    const textResponse = response.candidates[0].content.parts[0].text;

    // Clean and parse the response
    const cleanedTextResponse = textResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonResponse = JSON.parse(cleanedTextResponse);

    return NextResponse.json({ success: true, data: jsonResponse });
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json({ error: "Error processing the AI response" });
  }
}
