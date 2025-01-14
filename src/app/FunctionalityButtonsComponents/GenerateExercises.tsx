import { GiNotebook } from "react-icons/gi";
import { LuNotebookPen } from "react-icons/lu";

export default function GenerateExercises() {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-200 rounded-lg cursor-pointer">
      <LuNotebookPen color="black" size={21} />
      <div className="text-base leading-none text-neutral-900">
        Generate Exercises
      </div>
    </div>
  );
}
