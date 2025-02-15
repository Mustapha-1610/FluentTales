// InlineGrammarExercise.tsx
import { useTextTranslation } from "@/app/hooks/useTranslations";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import TranslationPopUp from "../Comprehension/TranslationsPopUp";

interface Option {
  text: string;
  is_correct: boolean;
  explanation: string;
}

interface Blank {
  options: Option[];
  explanation: string;
}

export interface ExerciseData {
  story: string;
  blanks: Blank[];
}

interface InlineGrammarExerciseProps {
  exerciseData: ExerciseData;
}

interface InlineBlankProps {
  blank: Blank;
  selected: number | "";
  index: number;
  isChecked: boolean;
  onSelect: (index: number, value: string) => void;
}

const InlineBlank: React.FC<InlineBlankProps> = ({
  blank,
  selected,
  index,
  isChecked,
  onSelect,
}) => {
  // Local state to control tooltip visibility
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("GrammarSection");
  return (
    <div
      className="relative inline-block mx-2 p-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <select
        className={`px-0.5 py-1 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none ${
          isChecked && selected !== ""
            ? blank.options[selected as number].is_correct
              ? "bg-green-200 dark:bg-green-900"
              : "bg-red-200 dark:bg-red-900"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
        value={selected === "" ? "" : selected}
        onChange={(e) => onSelect(index, e.target.value)}
        disabled={isChecked}
      >
        <option value=""> {t("Select")} </option>
        {blank.options.map((option, optionIndex) => (
          <option key={optionIndex} value={optionIndex}>
            {option.text}
          </option>
        ))}
      </select>
      {isChecked && isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 text-sm text-gray-800 dark:text-white z-10">
          <p className="font-bold">
            {t("Correct")} {blank.options.find((o) => o.is_correct)?.text}
          </p>
          <p className="mt-1">{blank.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default function FillInTheBlanksExercise({
  exerciseData,
}: InlineGrammarExerciseProps) {
  // Use the incoming exerciseData instead of hardcoded data
  const [selectedAnswers, setSelectedAnswers] = useState<(number | "")[]>(
    new Array(exerciseData.blanks.length).fill("")
  );
  const [isChecked, setIsChecked] = useState(false);

  const handleSelect = (index: number, value: string) => {
    const newSelected = [...selectedAnswers];
    newSelected[index] = value === "" ? "" : parseInt(value);
    setSelectedAnswers(newSelected);
  };

  const parts = exerciseData.story.split("___");

  const allAnswered = selectedAnswers.every((ans) => ans !== "");
  const locale = useLocale();

  const targetLanguage =
    locale === "en" ? "English" : locale === "fr" ? "French" : "Arabic";

  const {
    containerRef,
    selectedText,
    popupPosition,
    translationData,
    isFetching,
    error,
  } = useTextTranslation({
    targetLanguage,
    maxWordLimit: 15,
  });

  const t = useTranslations("GrammarSection");

  return (
    <div className="w-full mx-auto p-4 ">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        {t("FillInTheBlanks")}
      </h2>
      <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md dark:shadow-gray-700">
        <div
          ref={containerRef}
          className="text-gray-700 dark:text-gray-300 text-lg "
        >
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < exerciseData.blanks.length && (
                <InlineBlank
                  blank={exerciseData.blanks[index]}
                  selected={selectedAnswers[index]}
                  index={index}
                  isChecked={isChecked}
                  onSelect={handleSelect}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <button
        onClick={() => setIsChecked(true)}
        disabled={!allAnswered || isChecked}
        className={`mt-4 w-full px-6 py-3 rounded-lg font-semibold text-white ${
          !allAnswered || isChecked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {t("ShowAnswers")}
      </button>
      {popupPosition && (
        <TranslationPopUp
          error={error}
          isFetching={isFetching}
          popupPosition={popupPosition}
          selectedText={selectedText!}
          translationData={translationData}
        />
      )}
    </div>
  );
}
