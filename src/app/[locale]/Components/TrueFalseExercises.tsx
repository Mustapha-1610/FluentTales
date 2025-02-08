import React, { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";

interface TrueFalseExerciseProps {
  number: number;
  statement: string;
  isTrue: boolean;
  onSelectAnswer: (questionIndex: number, answer: boolean) => void;
  selectedAnswer: boolean | null;
  isAnswered: boolean;
}

const TrueFalseExercise: React.FC<TrueFalseExerciseProps> = ({
  number,
  statement,
  isTrue,
  onSelectAnswer,
  selectedAnswer,
  isAnswered,
}) => {
  return (
    <div className="dark:bg-gray-700 rounded-xl p-4">
      <div className="space-y-6">
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-5">
            {number + 1}. {statement}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => onSelectAnswer(number, true)}
              className={`flex-1 px-4 py-2 rounded-lg ${
                isAnswered
                  ? isTrue
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : selectedAnswer === true
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : "bg-gray-100 dark:bg-gray-800"
                  : selectedAnswer === true
                  ? "bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              True
            </button>
            <button
              onClick={() => onSelectAnswer(number, false)}
              className={`flex-1 px-4 py-2 rounded-lg ${
                isAnswered
                  ? !isTrue
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : selectedAnswer === false
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : "bg-gray-100 dark:bg-gray-800"
                  : selectedAnswer === false
                  ? "bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              False
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TrueFalseExercisesProps {
  true_false_exercises: any[];
  isLoading: boolean;
}

const TrueFalseExercises: React.FC<TrueFalseExercisesProps> = ({
  true_false_exercises,
  isLoading,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<(boolean | null)[]>(
    new Array(true_false_exercises.length).fill(null)
  );
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelectAnswer = (questionIndex: number, answer: boolean) => {
    if (!isAnswered) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[questionIndex] = answer;
      setSelectedAnswers(updatedAnswers);
    }
  };

  const handleCheckAnswers = () => {
    setIsAnswered(true);
  };

  return (
    <div className="relative dark:bg-gray-800 rounded-xl p-5 mt-12  border-2 border-gray-100 shadow-md dark:border-[#1e1e2f]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-75 rounded-xl">
          <PulseLoader color="#4b5563" size={10} />
        </div>
      )}
      {!isLoading && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
            True/False Exercises
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {true_false_exercises.map((item: any, index: number) => (
              <div className="rounded-lg p-2" key={index}>
                <TrueFalseExercise
                  number={index}
                  statement={item.statement}
                  isTrue={item.is_true}
                  onSelectAnswer={handleSelectAnswer}
                  selectedAnswer={selectedAnswers[index]}
                  isAnswered={isAnswered}
                />
              </div>
            ))}
          </div>
          <button
            className="w-full px-16 py-4 text-black dark:text-white bg-blue-100 dark:bg-blue-900 rounded-lg mt-6"
            onClick={handleCheckAnswers}
          >
            Check Answers
          </button>
        </>
      )}
    </div>
  );
};

export default TrueFalseExercises;
