import { useTranslations } from "next-intl";
import { LuNotebookPen } from "react-icons/lu";

interface Props {
  comprehenstionExercises: any;
  setShowComprehensionExercises: (show: boolean) => void;
  showComprehensionExercises: boolean;
  contentRegeneration: () => void;
}

export default function GenerateExercises({
  comprehenstionExercises,
  setShowComprehensionExercises,
  contentRegeneration,
  showComprehensionExercises,
}: Props) {
  const t = useTranslations("Buttons");

  return (
    <button
      onClick={() => (
        comprehenstionExercises && setShowComprehensionExercises(true),
        showComprehensionExercises && contentRegeneration()
      )}
      className={`flex items-center gap-2.5 px-4 py-3 rounded-lg 
        ${comprehenstionExercises ? "bg-gray-200" : "bg-gray-300"}`} // Conditional styling
      disabled={!comprehenstionExercises}
    >
      <LuNotebookPen
        color={comprehenstionExercises ? "black" : "gray"}
        size={21}
      />
      <div
        className={`text-base leading-none 
          ${comprehenstionExercises ? "text-neutral-900" : "text-neutral-500"}`}
      >
        {comprehenstionExercises && showComprehensionExercises
          ? t("Regenerate Exercises")
          : t("Generate Exercises")}
      </div>
    </button>
  );
}
