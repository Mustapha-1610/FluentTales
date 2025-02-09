import { useState } from "react";
import { useLocale } from "next-intl";
import { ExerciseData } from "./GrammarExercises";
import { grammarCourses } from "@/app/utils/grammarCourses";
import { SentenceRearrangementExerciseData } from "./SentenceRearrangementExercises";
import VideoCarousel from "./VideoCarousel";

interface Props {
  setExerciseData: (exerciseData: ExerciseData | null) => void;
  setSentenceRearrangementExercises: (
    value: SentenceRearrangementExerciseData[] | null
  ) => void;
}
export default function GrammarFilter({
  setExerciseData,
  setSentenceRearrangementExercises,
}: Props) {
  const [selectedLevel, setSelectedLevel] =
    useState<keyof typeof grammarCourses>("A1");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  async function generateExercises() {
    if (!selectedTopic) return;
    setIsLoading(true);
    setError(null);
    setExerciseData(null);
    setSentenceRearrangementExercises(null);
    try {
      const response = await fetch("/api/generateGrammarExercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: selectedLevel,
          course: selectedTopic,
          locale: locale,
        }),
      });
      const res = await response.json();
      if (res.success) {
        setExerciseData(res.data.fill_in_blanks);
        setSentenceRearrangementExercises(res.data.sentence_rearrangement);
      } else {
        setError("Error generating exercise.");
      }
    } catch (err) {
      setError("Error generating exercise.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex mx-auto w-full flex-col items-center justify-center mb-12 mt-12 ">
        <div className="flex  flex-col md:flex-row gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-full max-w-lg">
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Sprachlevel
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-none focus:ring-2 focus:ring-blue-500"
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value as keyof typeof grammarCourses);
                setSelectedTopic("");
              }}
            >
              {Object.keys(grammarCourses).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full md:w-auto">
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Grammatikthema
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-none focus:ring-2 focus:ring-blue-500"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">Wähle ein Thema</option>
              {grammarCourses[selectedLevel].map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center  mt-7 ">
            {" "}
            {/* Added flex items-center and margin adjustment */}
            <button
              onClick={generateExercises}
              className={`px-4 py-0.5 rounded-lg font-semibold whitespace-nowrap w-full md:w-auto flex items-center justify-center h-full ${
                // Added h-full
                selectedTopic && !isLoading
                  ? "bg-gray-200 dark:text-gray-100 text-gray-800 dark:bg-[#374151] cursor-pointer"
                  : "bg-gray-100 text-gray-500 dark:text-white dark:bg-[#1f2937] cursor-not-allowed"
              }`}
              disabled={!selectedTopic || isLoading}
            >
              <span className="text-sm text-center md:text-left">
                {isLoading ? "Generating..." : "Generate Exercises"}
              </span>
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}{" "}
        {/* Centered error message */}
      </div>
      <VideoCarousel course={selectedTopic} level={selectedLevel} />
    </>
  );
}
