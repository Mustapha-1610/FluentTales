import React, { useState } from "react";

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
      className={`  flex gap-2 px-3 py-2.5 rounded-lg border text-black ${
        isAnswered
          ? isCorrect
            ? "bg-green-500 text-white border-green-500"
            : isSelected
            ? "bg-red-500 text-white border-red-500"
            : "border-zinc-400"
          : isSelected
          ? "bg-blue-100"
          : "border-zinc-400"
      } cursor-pointer`}
    >
      <div
        className={`w-[13px] h-[13px] mt-1 rounded-full border ${
          isAnswered
            ? isCorrect
              ? "bg-green-500"
              : isSelected
              ? "bg-red-500"
              : "border-black"
            : "border-black"
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
    <div className="bg-white rounded-xl border border-zinc-300 shadow-sm p-4">
      <div className="space-y-6">
        <div>
          <p className="text-gray-700 mb-5">
            {number + 1}. {question}
          </p>
          <div className="space-y-2">
            {answers.map((item, index) => (
              <div onClick={() => onSelectAnswer(number, index)}>
                <QuestionOption
                  key={index}
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
}

const ComprehensionExercises: React.FC<ComprehensionExercisesProps> = ({
  comprehension_exercises,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(comprehension_exercises.length).fill(null)
  );
  const [isAnswered, setIsAnswered] = useState(false);

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

  return (
    <div className="bg-white rounded-xl border border-zinc-300 shadow-sm p-5 ">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Comprehension Exercises
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {comprehension_exercises.map((item: any, index: number) => (
          <div className="rounded-lg p-2" key={index}>
            <ComprehensionExercise
              key={index}
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
        className="w-full px-16 py-4 text-black bg-blue-50 rounded-lg mt-6"
        onClick={handleCheckAnswers}
      >
        Check Answers
      </button>
    </div>
  );
};

export default ComprehensionExercises;
