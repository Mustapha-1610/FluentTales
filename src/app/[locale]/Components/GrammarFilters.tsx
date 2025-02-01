import { useState } from "react";
import { useLocale } from "next-intl";
import { ExerciseData } from "./GrammarExercises";

const grammarTopicsByLevel = {
  A1: [
    "Artikel",
    "Personalpronomen",
    "Präsens",
    "Negation",
    "Wortstellung",
    "Modalverben",
    "Einfache Präpositionen",
    "Possessivpronomen",
    "Fragewörter",
    "Zahlen und Uhrzeit",
    "Trennbare Verben",
    "Imperativ",
    "Reflexive Verben",
  ],
  A2: [
    "Vergangenheit",
    "Dativ und Akkusativ",
    "Komparativ und Superlativ",
    "Trennbare und untrennbare Verben",
    "Weitere Modalverben",
    "Nebensätze",
    "Reflexive Verben mit Dativ",
    "Adjektivdeklination",
    "Relativsätze",
    "Genitiv",
    "Indirekte Fragen",
    "Adverbien",
  ],
  B1: [
    "Vergangenheit",
    "Plusquamperfekt",
    "Passiv",
    "Relativsätze mit Präpositionen",
    "Konjunktiv II",
    "Indirekte Rede",
    "Erweiterte Wortstellung",
    "Präpositionen mit Genitiv",
    "Modalverben im Präteritum",
    "Participles as Adjectives",
    "Satzgefüge und komplexe Satzstrukturen",
  ],
  B2: [
    "Konjunktiv I",
    "Erweiterter Konjunktiv II",
    "Erweitertes Passiv",
    "Infinitivsätze",
    "Partizipialsätze",
    "Nominalisierung",
    "Präpositionen mit speziellen Bedeutungen",
    "Erweiterte Adjektivendungen in komplexen Sätzen",
    "Verben mit festen Präpositionen",
    "Idiomatiche Ausdrücke und Redewendungen",
    "Stilistische Mittel",
    "Formale und informelle Sprache",
  ],
};

interface Props {
  setExerciseData: (exerciseData: ExerciseData | null) => void;
}
export default function GrammarFilter({ setExerciseData }: Props) {
  const [selectedLevel, setSelectedLevel] =
    useState<keyof typeof grammarTopicsByLevel>("A1");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  const generateExercises = async () => {
    if (!selectedTopic) return;
    setIsLoading(true);
    setError(null);
    setExerciseData(null);
    try {
      const res = await fetch("/api/generateGrammarExercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: selectedLevel,
          course: selectedTopic,
          locale: locale,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setExerciseData(json.data);
      } else {
        setError("Error generating exercise.");
      }
    } catch (err) {
      setError("Error generating exercise.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-12 mt-12">
      <div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
            Sprachlevel
          </label>
          <select
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-none focus:ring-2 focus:ring-blue-500"
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(
                e.target.value as keyof typeof grammarTopicsByLevel
              );
              setSelectedTopic("");
            }}
          >
            {Object.keys(grammarTopicsByLevel).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
            Grammatikthema
          </label>
          <select
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-none focus:ring-2 focus:ring-blue-500"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="">Wähle ein Thema</option>
            {grammarTopicsByLevel[selectedLevel].map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={generateExercises}
          className={`mt-6 px-4 rounded-lg font-semibold ${
            selectedTopic && !isLoading
              ? "bg-gray-200 dark:text-gray-100 text-gray-800 dark:bg-[#374151] cursor-pointer"
              : "bg-gray-100 text-gray-500 dark:text-white dark:bg-[#1f2937] cursor-not-allowed"
          }`}
          disabled={!selectedTopic || isLoading}
        >
          <span>{isLoading ? "Generating..." : "Generate Exercises"}</span>
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
