// SentenceRearrangementExerciseItem.tsx
import React, { useState } from "react";

export interface SentenceRearrangementExerciseData {
  jumbled_words: string[];
  valid_sentences: string[];
}

interface SentenceRearrangementExerciseItemProps {
  exerciseData: SentenceRearrangementExerciseData;
  exerciseNumber: number;
  answer: number[]; // indices of selected words (in order)
  isChecked: boolean;
  onSelectWord: (wordIndex: number) => void;
  onRemoveWord: (position: number) => void;
}

const SentenceRearrangementExerciseItem: React.FC<
  SentenceRearrangementExerciseItemProps
> = ({
  exerciseData,
  exerciseNumber,
  answer,
  isChecked,
  onSelectWord,
  onRemoveWord,
}) => {
  // Build the user's sentence from the selected word indices.
  const userSentence = answer
    .map((i) => exerciseData.jumbled_words[i])
    .join(" ");

  // Normalize a sentence by lower-casing, removing punctuation, and trimming extra spaces.
  const normalizeSentence = (sentence: string) =>
    sentence
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // Compare the normalized user sentence with the normalized valid sentences.
  const isAnswerCorrect = exerciseData.valid_sentences.some(
    (valid) => normalizeSentence(valid) === normalizeSentence(userSentence)
  );

  return (
    <div className="dark:bg-gray-700 rounded-xl p-4">
      {/* Available Words */}
      <div className="mb-4">
        <p className="font-medium text-gray-800 dark:text-gray-100 mb-2">
          Verfügbare Wörter:
        </p>
        <div className="flex flex-wrap gap-2">
          {exerciseData.jumbled_words.map((word, index) => {
            // Disable a word if it is already selected or if answers have been checked.
            const isDisabled = answer.includes(index) || isChecked;
            return (
              <button
                key={index}
                onClick={() => onSelectWord(index)}
                disabled={isDisabled}
                className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* Constructed Sentence */}
      <div className="mb-4">
        <p className="font-medium text-gray-800 dark:text-gray-100 mb-2">
          Dein Satz:
        </p>
        {answer.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {answer.map((wordIndex, pos) => (
              <span
                key={pos}
                onClick={() => !isChecked && onRemoveWord(pos)}
                className="cursor-pointer bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-2 px-3 rounded shadow-sm hover:opacity-80 transition"
                title="Klicke, um das Wort zu entfernen"
              >
                {exerciseData.jumbled_words[wordIndex]}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Wähle die Wörter in der richtigen Reihenfolge aus.
          </p>
        )}
      </div>

      {/* Feedback Section (shown after global check) */}
      {isChecked && (
        <div className="mt-4">
          {isAnswerCorrect ? (
            <div className="p-4 bg-green-200 dark:bg-green-900 rounded-lg text-green-800 dark:text-green-100 font-medium">
              Super, dein Satz ist korrekt!
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-red-200 dark:bg-red-900 rounded-lg text-red-800 dark:text-red-300 font-medium">
                Deine Antwort:
                <div className="mt-2 line-through">{userSentence}</div>
              </div>
              <div className="p-4 bg-green-200 dark:bg-green-900 rounded-lg text-green-800 dark:text-green-100 font-medium">
                Korrekte Satzstruktur:
                <div className="mt-2">
                  {exerciseData.valid_sentences.map((sentence, idx) => (
                    <div key={idx}>{sentence}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface SentenceRearrangementExercisesProps {
  exercises: SentenceRearrangementExerciseData[];
}

const SentenceRearrangementExercises: React.FC<
  SentenceRearrangementExercisesProps
> = ({ exercises }) => {
  // Maintain an array of answers (each answer is an array of selected word indices)
  const [answers, setAnswers] = useState<number[][]>(exercises.map(() => []));
  const [isChecked, setIsChecked] = useState(false);

  // Add a word to the answer for a specific exercise.
  const handleSelectWord = (exerciseIndex: number, wordIndex: number) => {
    if (!isChecked) {
      setAnswers((prev) => {
        const newAnswers = [...prev];
        if (!newAnswers[exerciseIndex].includes(wordIndex)) {
          newAnswers[exerciseIndex] = [...newAnswers[exerciseIndex], wordIndex];
        }
        return newAnswers;
      });
    }
  };

  // Remove a word from the answer for a specific exercise.
  const handleRemoveWord = (exerciseIndex: number, position: number) => {
    if (!isChecked) {
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[exerciseIndex] = newAnswers[exerciseIndex].filter(
          (_, i) => i !== position
        );
        return newAnswers;
      });
    }
  };

  // Determine if all exercises have been completed.
  const allCompleted = exercises.every(
    (ex, idx) => answers[idx].length === ex.jumbled_words.length
  );

  const handleCheckAnswers = () => {
    setIsChecked(true);
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Sentence Rearrangement
      </h2>
      <div className=" w-full mx-auto   p-4  border dark:border-gray-700 rounded-lg shadow-md dark:shadow-gray-700 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {exercises.map((exercise, index) => (
            <div key={index} className="rounded-lg p-2">
              <SentenceRearrangementExerciseItem
                exerciseData={exercise}
                exerciseNumber={index + 1}
                answer={answers[index]}
                isChecked={isChecked}
                onSelectWord={(wordIndex) => handleSelectWord(index, wordIndex)}
                onRemoveWord={(position) => handleRemoveWord(index, position)}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className={`mt-4 w-full px-6 py-3 rounded-lg font-semibold text-white ${
          !allCompleted || isChecked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={!allCompleted || isChecked}
        onClick={handleCheckAnswers}
      >
        Antwort überprüfen
      </button>
    </div>
  );
};

export default SentenceRearrangementExercises;
