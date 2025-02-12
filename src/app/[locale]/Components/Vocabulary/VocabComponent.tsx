import { useState } from "react";
import VideoCarousel from "./VideoCarousel";
import SuggestionModal from "./SuggestionModal";
import GeneratedNouns from "./GeneratedNouns";
import VocabFilters from "./VocabFilters";
import GeneratedVerbs from "./GeneratedVerbs";
import { useGetGeneratedVerbs } from "@/app/hooks/useGetGeneratedVocab";

export interface VocabularyItem {
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
  const { error, generateVocabulary, isLoading, setTheme, theme, vocabulary } =
    useGetGeneratedVerbs();
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);

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
      <VocabFilters
        generateVocabulary={generateVocabulary}
        isLoading={isLoading}
        setShowSuggestionsModal={setShowSuggestionsModal}
        setTheme={setTheme}
        theme={theme}
      />
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {vocabulary && (
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Nouns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {vocabulary.nouns.map((noun, index) => (
                <GeneratedNouns noun={noun} key={index} />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
              Verbs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {vocabulary.verbs.map((verb, index) => (
                <GeneratedVerbs verb={verb} key={index} />
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
      {showSuggestionsModal && (
        <SuggestionModal
          setShowSuggestionsModal={setShowSuggestionsModal}
          setTheme={setTheme}
        />
      )}
    </div>
  );
}
