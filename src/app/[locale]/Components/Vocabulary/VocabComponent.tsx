import { useState } from "react";
import { useLocale } from "next-intl";
import VideoCarousel from "./VideoCarousel";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface VocabularyItem {
  nouns: Array<{
    word: string;
    article: string;
    plural: string;
    translation: string;
    example: string;
  }>;
  verbs: Array<{
    word: string;
    translation: string;
    example: string;
  }>;
  phrases: Array<{
    german: string;
    translation: string;
  }>;
}
const levelTopics = {
  A1: [
    "Family",
    "Numbers",
    "Colors",
    "Food & Drinks",
    "Animals",
    "Daily Routine",
    "Clothing",
    "Home & Living",
    "Professions",
    "Transportation",
  ],
  A2: [
    "Weather",
    "Travel",
    "Shopping",
    "Health",
    "Hobbies",
    "Directions",
    "Time & Dates",
    "School",
    "Restaurant",
    "Emotions",
  ],
  B1: [
    "Work Environment",
    "Politics",
    "Technology",
    "Education",
    "Environment",
    "Media",
    "Culture",
    "Relationships",
    "Finance",
    "Travel Planning",
  ],
  B2: [
    "Abstract Concepts",
    "Literature",
    "Philosophy",
    "Career Development",
    "Science",
    "Law",
    "Psychology",
    "Global Issues",
    "Advanced Politics",
    "Economics",
  ],
};
export default function VocabularyGenerator() {
  const [theme, setTheme] = useState("");
  const [vocabulary, setVocabulary] = useState<VocabularyItem | null>(null);
  const [previous_generation, setPreviousGeneration] =
    useState<VocabularyItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locale = useLocale();

  const generateVocabulary = async () => {
    if (!theme.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/vocabGeneration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          previous_generation,
          theme,
          locale:
            locale === "en" ? "English" : locale === "ar" ? "Arabic" : "French",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setVocabulary(data.data);
      } else {
        setError("Error generating vocabulary");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
  const [selectedSuggestionLevel, setSelectedSuggestionLevel] = useState("A1");
  const [selectedSuggestionTopic, setSelectedSuggestionTopic] = useState("");

  const SuggestionsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl mx-4">
        <h3 className="text-xl font-bold mb-4 dark:text-white">
          Vocabulary Theme Suggestions
        </h3>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.keys(levelTopics).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedSuggestionLevel(level)}
              className={`p-3 rounded-lg text-sm ${
                selectedSuggestionLevel === level
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
          {levelTopics[selectedSuggestionLevel as keyof typeof levelTopics].map(
            (topic) => (
              <button
                key={topic}
                onClick={() => setSelectedSuggestionTopic(topic)}
                className={`p-3 rounded-lg text-left ${
                  selectedSuggestionTopic === topic
                    ? " ring-blue-500 bg-blue-50 dark:bg-blue-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <span className="dark:text-gray-200">{topic}</span>
              </button>
            )
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowSuggestionsModal(false)}
            className="px-4 py-2 text-gray-600 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedSuggestionTopic) {
                setTheme(selectedSuggestionTopic);
                setShowSuggestionsModal(false);
              }
            }}
            className={`px-4 py-2 rounded-lg ${
              selectedSuggestionTopic
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedSuggestionTopic}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className=" mx-auto p-4 w-full mt-6 ">
      <div className="  mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold dark:text-white">
            Learning Videos
          </h2>
        </div>
        <VideoCarousel />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold dark:text-white">
          Vocabulary Generator
        </h2>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 mb-8 w-full">
        <div className="flex flex-col md:flex-row gap-4 items-end w-full">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme/Topic
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:outline-none "
              placeholder="e.g., Transportation, Food, School"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-auto">
            <button
              onClick={() => setShowSuggestionsModal(true)}
              className="flex gap-2 px-3 py-3 mr-2 text-gray-800 dark:text-gray-100 bg-blue-50 dark:bg-blue-900 rounded-xl items-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
            >
              Suggestions
            </button>

            <button
              onClick={generateVocabulary}
              disabled={!theme.trim() || isLoading}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isLoading || !theme.trim()
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
      {/* Results Section */}
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {vocabulary && (
        <div className="space-y-8">
          {/* Nouns Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Nouns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {vocabulary.nouns.map((noun, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className={` capitalize text-lg font-semibold ${
                        noun.article === "der"
                          ? "text-red-500"
                          : noun.article === "die"
                          ? "text-blue-500"
                          : "text-green-500"
                      }`}
                    >
                      {noun.article}
                    </span>
                    <span className="text-xl dark:text-white">{noun.word}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Plural: <span className="font-medium">{noun.plural}</span>
                    <br />
                    Translation:{" "}
                    <span className="font-medium">{noun.translation}</span>
                    <br />
                    Example: <span className="italic">{noun.example}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Verbs Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
              Verbs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {vocabulary.verbs.map((verb, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className=" capitalize text-xl font-semibold mb-2 dark:text-white">
                    {verb.word}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Translation:{" "}
                    <span className="font-medium">{verb.translation}</span>
                    <br />
                    Example: <span className="italic">{verb.example}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Phrases Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
              Useful Phrases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vocabulary.phrases.map((phrase, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <p className="text-lg font-medium dark:text-white">
                    {phrase.german}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {phrase.translation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showSuggestionsModal && <SuggestionsModal />}
    </div>
  );
}
