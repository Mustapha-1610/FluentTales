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
        topP: 0.95,
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
Generate a German story that adheres to the following filters:

- **Context/Theme**: ${context}
- **Length**: ${generationLength} (Short: 300-600 words, Medium: 700-1000 words, Long: 1100-1400 words)
- **Language Level**: ${languageLevel}
- **Target Audience**: ${targetAudience}
- **Grammar Level**: ${grammarLevel}

### Requirements:
1. The story should be **engaging, fluid, and natural**, avoiding a robotic tone or overly simplistic, repetitive sentence structures. 
2. Use a **vivid and descriptive writing style**, with appropriate transitions between sentences to create a cohesive narrative.
3. Integrate varied sentence lengths and structures for a more dynamic flow.
4. Avoid excessive punctuation (e.g., avoid overusing short sentences separated by periods). Ensure the story reads smoothly and professionally.
5. Incorporate realistic dialogue or descriptions where appropriate to make the story relatable and immersive.

### Output:
Return the results in the following **valid JSON** format:

\`\`\`json
{
  "story": "The generated story text here.",
  "exercises": [
    {
      "question": "Comprehension question 1?",
      "answers": [
        {"text": "Answer option 1", "is_correct": false},
        {"text": "Answer option 2", "is_correct": false},
        {"text": "Answer option 3", "is_correct": false}
      ]
    },
    ...
  ]
}
\`\`\`

- The exercises must accurately reflect the content of the story, using grammatically correct, level-appropriate language. Ensure questions and answers are **diverse and thoughtful**, promoting comprehension and engagement.
- Avoid including any additional text, commentary, or formatting outside the JSON structure.

### Additional Notes:
1. Prioritize **professionalism and creativity** in the story.
2. Ensure the output matches the specified audience and language level.
3. Maintain clean formatting and well-structured JSON output.
4. Only Generate 4 exercises.
5. The correct answer position must be varied. Specifically:
   - Each correct answer position (1, 2, 3) should be used at least once.
   - The same correct answer position should not appear consecutively more than twice.
   - Ensure that no pattern in answer positions is easily detectable.

### Example:
For example, if the second option is the correct answer in two consecutive questions, the subsequent questions must not have the second option as correct. This ensures variation in correct answer positions.
  ### Creative Requirements:
1. Vary these elements EVERY TIME:
   - Narrative perspective (first/third/limited omniscient)
   - Genre/tone (humorous, mysterious, heartwarming, adventurous)
   - Story structure (linear/non-linear, flashbacks, twist endings)
   - Character types (different ages, backgrounds, motivations)
   - Conflict types (internal/external, nature/social/self)
2. Include UNEXPECTED ELEMENTS:
   - Unique twist in the middle/end
   - Unconventional character decisions
   - Surprising but plausible dialogue
   - Symbolic elements/metaphors

3. Style Variation:
   - Alternate between descriptive/action-driven scenes
   - Mix dialogue/narration ratios
   - Use different literary devices (foreshadowing, irony)
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
