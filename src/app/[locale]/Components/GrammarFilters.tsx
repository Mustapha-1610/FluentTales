import { useState } from "react";

const grammarTopicsByLevel = {
  A1: [
    "Artikel (der, die, das)",
    "Personalpronomen",
    "Präsens (regelmäßige Verben)",
    "Negation (nicht, kein)",
    "Wortstellung (grundlegend)",
    "Modalverben (Einführung)",
    "Einfache Präpositionen",
  ],
  A2: [
    "Vergangenheit (Perfekt)",
    "Dativ und Akkusativ",
    "Komparativ & Superlativ",
    "Trennbare Verben",
    "Weitere Modalverben",
    "Nebensätze (weil, dass, wenn)",
    "Reflexive Verben",
  ],
  B1: [
    "Vergangenheit (Präteritum)",
    "Passiv (Präsens & Vergangenheit)",
    "Relativsätze",
    "Erweiterte Wortstellung",
    "Konjunktiv II (Höflichkeit & Hypothetisches)",
    "Adjektivdeklination",
    "Indirekte Rede",
  ],
  B2: [
    "Kausale Konjunktionen",
    "Nominalisierung",
    "Erweitertes Passiv",
    "Erweiterter Konjunktiv",
    "Komplexe Satzstrukturen",
    "Erweiterte Adjektivendungen",
    "Idiomatiche Ausdrücke",
  ],
};

export default function GrammarFilter() {
  const [selectedLevel, setSelectedLevel] =
    useState<keyof typeof grammarTopicsByLevel>("A1");
  const [selectedTopic, setSelectedTopic] = useState<string>("");

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
          className={`mt-6 px-4 rounded-lg  font-semibold ${
            selectedTopic
              ? "bg-gray-200 dark:text-gray-100 text-gray-800 dark:bg-[#374151] cursor-pointer"
              : "bg-gray-100 text-gray-500 dark:text-white dark:bg-[#1f2937] cursor-not-allowed"
          }`}
          disabled={!selectedTopic}
        >
          <span>Generate Exercises</span>
        </button>
      </div>
    </div>
  );
}
