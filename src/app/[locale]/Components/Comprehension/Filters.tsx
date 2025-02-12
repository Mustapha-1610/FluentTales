import { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import FilterModal from "./SelectFiltersModal";
import { FilterForm } from "../../Types/filter-form";
import { useTranslations } from "next-intl";
interface Props {
  setStory: (story: string | null) => void;
  setComprehensionExercises: (exercises: any) => void;
  setLoading: (loading: boolean) => void;
  setShowComprehensionExercises: (show: boolean) => void;
  isLoading: boolean;
  setShow_True_False_Exercises: (value: boolean) => void;
  setTrue_False_Exercises: (value: any[]) => void;
}
export default function Filters({
  setComprehensionExercises,
  setStory,
  setLoading,
  setShowComprehensionExercises,
  isLoading,
  setShow_True_False_Exercises,
  setTrue_False_Exercises,
}: Props) {
  const [isFiltersModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterForm>({
    generationLength: "short",
    grammarLevel: "easy",
    languageLevel: "A1",
    targetAudiance: "general",
  });
  const [storyContext, setStoryContext] = useState<string>("");
  async function generateContent() {
    if (
      storyContext !== "" ||
      (storyContext !== null && storyContext.length >= 10)
    ) {
      try {
        setComprehensionExercises(null);
        setShow_True_False_Exercises(false);
        setShowComprehensionExercises(false);
        setLoading(true);
        const response = await fetch("/api/generate-comprehension-story", {
          method: "POST",
          body: JSON.stringify({
            generationLength: filterOptions.generationLength,
            grammarLevel: filterOptions.grammarLevel,
            languageLevel: filterOptions.languageLevel,
            targetAudiance: filterOptions.targetAudiance,
            context: storyContext,
          }),
        });
        const res = await response.json();
        setStory(res.data.story);
        setComprehensionExercises(res.data.comprehension_exercises);
        setTrue_False_Exercises(res.data.true_false_exercises);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }
  const t = useTranslations("Filters");

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-between pr-4 w-full text-base max-md:max-w-full items-center">
        <div className="flex flex-wrap gap-5">
          <div className="flex gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-xl items-center max-md:w-full">
            <div className="text-gray-700 dark:text-gray-300 font-bold">
              {t("Language Level")}:
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-100 first-letter:capitalize">
              {t(filterOptions.languageLevel)}
            </div>
          </div>
          <div className="flex gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-xl items-center max-md:w-full">
            <div className="text-gray-700 dark:text-gray-300 font-bold">
              {t("Grammar Difficulty")}:
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-100 first-letter:capitalize">
              {t(filterOptions.grammarLevel)}
            </div>
          </div>
          <div className="flex gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-xl items-center max-md:w-full">
            <div className="text-gray-700 dark:text-gray-300 font-bold">
              {t("Story Length")}:
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-100 first-letter:capitalize">
              {t(filterOptions.generationLength)}
            </div>
          </div>
          <div className="flex gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-xl items-center max-md:w-full">
            <div className="text-gray-700 dark:text-gray-300 font-bold">
              {t("Target Audience")}:
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-100 first-letter:capitalize">
              {t(filterOptions.targetAudiance)}
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center   rounded-xl items-center max-md:w-full">
          <div
            className="flex justify-center gap-2 px-3  py-3 mr-2 text-gray-800 dark:text-gray-100 bg-blue-50 dark:bg-blue-900 rounded-xl items-center cursor-pointer max-md:w-full"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <IoMdSettings size={20} />
            <div>{t("Edit Filters")}</div>
          </div>
        </div>
      </div>

      <div className="flex mt-4 mr-4 items-center">
        <input
          type="text"
          value={storyContext}
          onChange={(e) => setStoryContext(e.target.value)}
          placeholder={t("Enter Context")}
          className="flex-grow px-4 py-3 bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-100 border border-solid rounded-xl shadow-sm border-gray-300 dark:border-gray-600 focus:outline-none"
        />
        <button
          className={`flex gap-3.5 px-4 mr-2 py-3 text-center text-gray-800  whitespace-nowrap bg-gray-200 ${
            isLoading || storyContext === "" || storyContext.length < 10
              ? "cursor-not-allowed "
              : "cursor-pointer"
          }  rounded-xl items-center ml-4 max-w-32 min-w-28 justify-center  `}
          disabled={
            isLoading || storyContext === "" || storyContext.length < 10
          }
          onClick={generateContent}
        >
          <FaWandMagicSparkles />
          <div>{t("Generate")}</div>
        </button>
      </div>
      {isFiltersModalOpen && (
        <FilterModal
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          setIsOpen={setIsFilterModalOpen}
        />
      )}
    </>
  );
}
