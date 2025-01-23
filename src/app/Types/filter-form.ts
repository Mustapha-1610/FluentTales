export interface FilterForm {
  languageLevel: "A1" | "A2" | "B1" | "B2";
  grammarLevel: "easy" | "intermediate" | "hard";
  generationLength: "short" | "medium" | "long";
  targetAudiance: "kids" | "teenagers" | "general" | "adults";
}
