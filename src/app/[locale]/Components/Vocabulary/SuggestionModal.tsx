import { suggestionTopics } from "@/app/utils/suggestionTopics";
import { useState } from "react";

interface Props {
  setTheme: (value: string) => void;
  setShowSuggestionsModal: (show: boolean) => void;
}
export default function SuggestionModal({
  setShowSuggestionsModal,
  setTheme,
}: Props) {
  const [selectedSuggestionLevel, setSelectedSuggestionLevel] = useState("A1");
  const [selectedSuggestionTopic, setSelectedSuggestionTopic] = useState("");

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl mx-4">
          <h3 className="text-xl font-bold mb-4 dark:text-white">
            Vocabulary Theme Suggestions
          </h3>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {Object.keys(suggestionTopics).map((level) => (
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
            {suggestionTopics[
              selectedSuggestionLevel as keyof typeof suggestionTopics
            ].map((topic) => (
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
            ))}
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
    </>
  );
}
