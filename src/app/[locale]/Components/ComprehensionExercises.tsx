import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";

interface QuestionOptionProps {
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
  isAnswered: boolean;
}

const QuestionOption: React.FC<QuestionOptionProps> = ({
  text,
  isCorrect,
  isSelected,
  isAnswered,
}) => {
  return (
    <div
      className={`flex gap-2 px-3 py-2.5 rounded-lg text-black dark:text-gray-200 ${
        isAnswered
          ? isCorrect
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : isSelected
            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            : "bg-gray-100 dark:bg-gray-800"
          : isSelected
          ? "bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
          : "bg-gray-100 dark:bg-gray-800"
      } cursor-pointer`}
    >
      <div
        className={`w-[13px] h-[13px] mt-1 rounded-full border ${
          isAnswered
            ? isCorrect
              ? "bg-green-300 dark:bg-green-700"
              : isSelected
              ? "bg-red-300 dark:bg-red-700"
              : "border-black dark:border-gray-300"
            : "border-black dark:border-gray-300"
        }`}
      />
      <div className="flex-1">{text}</div>
    </div>
  );
};

interface ComprehensionExerciseProps {
  number: number;
  question: string;
  answers: any[];
  onSelectAnswer: (questionIndex: number, answerIndex: number) => void;
  selectedAnswerIndex: number | null;
  isAnswered: boolean;
}

const ComprehensionExercise: React.FC<ComprehensionExerciseProps> = ({
  number,
  question,
  answers,
  onSelectAnswer,
  selectedAnswerIndex,
  isAnswered,
}) => {
  return (
    <div className=" dark:bg-gray-700 rounded-xl p-4 ">
      <div className="space-y-6">
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-5">
            {number + 1}. {question}
          </p>
          <div className="space-y-2">
            {answers.map((item, index) => (
              <div onClick={() => onSelectAnswer(number, index)} key={index}>
                <QuestionOption
                  text={item.text}
                  isCorrect={item.is_correct}
                  isSelected={selectedAnswerIndex === index}
                  isAnswered={isAnswered}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ComprehensionExercisesProps {
  comprehension_exercises: any;
  isLoading: boolean;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const ComprehensionExercises: React.FC<ComprehensionExercisesProps> = ({
  comprehension_exercises,
  isLoading,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(comprehension_exercises.length).fill(null)
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledExercises, setShuffledExercises] = useState<any[]>([]);

  useEffect(() => {
    setSelectedAnswers(new Array(comprehension_exercises.length).fill(null));
    setIsAnswered(false);
    setShuffledExercises(
      comprehension_exercises.map((exercise: any) => ({
        ...exercise,
        answers: shuffleArray([...exercise.answers]),
      }))
    );
  }, [comprehension_exercises]);

  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    if (!isAnswered) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[questionIndex] = answerIndex;
      setSelectedAnswers(updatedAnswers);
    }
  };

  const handleCheckAnswers = () => {
    setIsAnswered(true);
  };
  const t = useTranslations("ComprehensionExercises");

  return (
    <div className="relative  dark:bg-gray-800 rounded-xl shadow-sm p-5">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-75 rounded-xl">
          <PulseLoader color="#4b5563" size={10} />
        </div>
      )}
      {!isLoading && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
            {t("title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {shuffledExercises.map((item: any, index: number) => (
              <div className="rounded-lg p-2" key={index}>
                <ComprehensionExercise
                  number={index}
                  answers={item.answers}
                  question={item.question}
                  onSelectAnswer={handleSelectAnswer}
                  selectedAnswerIndex={selectedAnswers[index]}
                  isAnswered={isAnswered}
                />
              </div>
            ))}
          </div>
          <button
            className="w-full px-16 py-4 text-black dark:text-white bg-blue-100 dark:bg-blue-900 rounded-lg mt-6"
            onClick={handleCheckAnswers}
          >
            {t("Check Answers")}
          </button>
        </>
      )}
    </div>
  );
};

export default ComprehensionExercises;
