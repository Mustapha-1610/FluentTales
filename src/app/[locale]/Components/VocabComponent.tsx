import { useState } from "react";
import { useLocale } from "next-intl";

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

export default function VocabularyGenerator() {
  const [selectedLevel, setSelectedLevel] = useState("A1");
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

  return (
    <div className=" mx-auto p-4 w-full mt-12">
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

          <div className="w-1/6">
            <button
              onClick={generateVocabulary}
              disabled={!theme.trim() || isLoading}
              className={` bg-gray-200 w-full px-6 py-2 rounded-lg font-medium transition-colors ${
                isLoading || !theme.trim() || theme.length < 3
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800  "
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
    </div>
  );
}
