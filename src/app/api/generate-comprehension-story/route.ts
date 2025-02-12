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
- **Story Length**: ${generationLength} (${generationLength}: short: 200-400 words, medium: 500-700 words, long: 900-1100 words)
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

#### **Exercise Requirements**
1. **Comprehension Questions (4 total)**:
   - Each question should have **three answer choices**.
   - Only **one answer is correct**, but its position should vary across questions.
   - The two incorrect answers should be plausible but clearly wrong.

2. **True/False Statements (6 total)**:
   - The mix of True and False answers should **vary randomly in each generation**.
   - Make sure there are always atleast  3 answers that  are  true and 3 that are false but they should be randomly positioned.

#### Output Format:
Return the result in **valid JSON** with the following structure:
\`\`\`json
{
  "story": "Generated story text.",
  "comprehension_exercises": [
    {
      "question": "Comprehension question?",
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
      "statement": "Statement based on the story.",
      "is_true": true
    },
    ...
  ]
}
\`\`\`

#### Additional Guidelines:
1. **Exercise Quality**:
   - Ensure questions and answers are grammatically accurate and level-appropriate.
   - Avoid predictable patterns in correct answer positions (e.g., no consecutive correct answers in the same position).
   - Respect word minimum count for each story length parameter as the options suggest.
   
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
