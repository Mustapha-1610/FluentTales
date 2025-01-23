import { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import FilterModal from "./SelectFiltersModal";
import { FilterForm } from "../Types/filter-form";
interface Props {
  setStory: (story: string | null) => void;
  setComprehensionExercises: (exercises: any) => void;
}
export default function Filters({
  setComprehensionExercises,
  setStory,
}: Props) {
  async function generateContent() {
    const response = await fetch("/api/generativeAI", { method: "GET" });
    const res = await response.json();
    setStory(res.data.story);
    setComprehensionExercises(res.data.exercises);
  }
  const [isFiltersModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterForm>({
    generationLength: "short",
    grammarLevel: "easy",
    languageLevel: "A1",
    targetAudiance: "general",
  });
  return (
    <>
      <div className="flex flex-wrap gap-5 justify-between pr-4 w-full text-base max-md:max-w-full items-center">
        <div className="flex gap-5">
          <div className="flex gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-xl items-center">
            <div className="text-gray-700 dark:text-gray-300 font-bold">
              Language Level:
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-100 first-letter:capitalize">
              {filterOptions.languageLevel}
            </div>
          </div>
          <div className="flex gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-xl items-center">
            <div className="text-gray-700 dark:text-gray-300 font-bold">
              Grammer Difficulty:
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-100 first-letter:capitalize">
              {filterOptions.grammarLevel}
            </div>
          </div>
          <div className="flex gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-xl items-center">
            <div className="text-gray-700 dark:text-gray-300 font-bold">
              Story Length:
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-100 first-letter:capitalize">
              {filterOptions.generationLength}
            </div>
          </div>
          <div className="flex gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-xl items-center">
            <div className="text-gray-700 dark:text-gray-300 font-bold">
              Target Audience:
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-100 first-letter:capitalize">
              {filterOptions.targetAudiance}
            </div>
          </div>
        </div>
        <div
          className="flex gap-2 px-3 py-3 mr-2 text-gray-800 dark:text-gray-100 bg-blue-50 dark:bg-blue-900 rounded-xl items-center cursor-pointer"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <IoMdSettings size={20} />
          <div>Edit Filters</div>
        </div>
      </div>

      <div className="flex mt-4 mr-4 items-center">
        <input
          type="text"
          placeholder="Enter context or theme for your story..."
          className="flex-grow px-4 py-3 bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-100 border border-solid rounded-xl shadow-sm border-gray-300 dark:border-gray-600"
        />
        <div
          className="flex gap-3.5 px-4 mr-2 py-3 text-center text-gray-800  whitespace-nowrap bg-gray-200  rounded-xl items-center ml-4 cursor-pointer"
          onClick={generateContent}
        >
          <FaWandMagicSparkles />
          <div>Generate</div>
        </div>
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
