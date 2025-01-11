import React from "react";

interface QuestionOptionProps {
  text: string;
}

const QuestionOption: React.FC<QuestionOptionProps> = ({ text }) => (
  <div className="flex gap-2 px-3 py-2.5 rounded-lg border border-zinc-400 text-black">
    <div className="w-[13px] h-[13px] mt-1 rounded-full border border-black" />
    <div className="flex-1">{text}</div>
  </div>
);
interface Props {
  number: number;
}
function ComprehensionExercise({ number }: Props) {
  return (
    <div className="bg-white rounded-xl border border-zinc-300 shadow-sm p-4">
      <div className="space-y-6">
        <div>
          <p className="text-gray-700 mb-5">
            {number}. What is the main setting of the story?
          </p>
          <div className="space-y-2 cursor-pointer">
            <QuestionOption text="A coffee shop in Berlin" />
            <QuestionOption text="A restaurant in Munich" />
            <QuestionOption text="A park in Hamburg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const ComprehensionExercises: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-zinc-300 shadow-sm p-5 mb-16">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Comprehension Exercises
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-lg p-2">
          <ComprehensionExercise number={1} />
        </div>
        <div className="rounded-lg p-2">
          <ComprehensionExercise number={2} />
        </div>
        <div className="rounded-lg p-2">
          <ComprehensionExercise number={3} />
        </div>
        <div className="rounded-lg p-2">
          <ComprehensionExercise number={4} />
        </div>
      </div>
      <button className="w-full px-16 py-4 text-black bg-blue-50  rounded-lg  mt-6">
        Check Answers
      </button>
    </div>
  );
};
