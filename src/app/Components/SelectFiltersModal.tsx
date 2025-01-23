import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FilterForm } from "../Types/filter-form";

interface FilterModalProps {
  setIsOpen: (value: boolean) => void;
  setFilterOptions: (options: FilterForm) => void;
  filterOptions: FilterForm;
}

export default function FilterModal({
  setIsOpen,
  setFilterOptions,
  filterOptions,
}: FilterModalProps) {
  const [selectedLevel, setSelectedLevel] = useState<"A1" | "A2" | "B1" | "B2">(
    filterOptions.languageLevel
  );
  const [selectedGrammar, setSelectedGrammar] = useState<
    "easy" | "intermediate" | "hard"
  >(filterOptions.grammarLevel);
  const [selectedLength, setSelectedLength] = useState<
    "short" | "medium" | "long"
  >(filterOptions.generationLength);
  const [selectedAudience, setSelectedAudience] = useState<
    "kids" | "teenagers" | "general" | "adults"
  >(filterOptions.targetAudiance);

  const FilterSection = ({
    title,
    options,
    state,
    setState,
  }: {
    title: string;
    options: string[];
    state: string;
    setState: (value: string | any) => void;
  }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors justify-center
              ${
                state === option
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
          >
            <input
              type="radio"
              name={title}
              value={option}
              checked={state === option}
              onChange={(e) => setState(e.target.value)}
              className="hidden"
            />
            <span className="capitalize">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
  function onConfirm() {
    setFilterOptions({
      generationLength: selectedLength,
      grammarLevel: selectedGrammar,
      languageLevel: selectedLevel,
      targetAudiance: selectedAudience,
    });
    setIsOpen(false);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 w-[900px] max-w-5xl mx-4">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Filter Settings
        </h2>

        <FilterSection
          title="Language Level"
          options={["A1", "A2", "B1", "B2"]}
          state={selectedLevel}
          setState={setSelectedLevel}
        />

        <FilterSection
          title="Grammar Difficulty"
          options={["easy", "intermediate", "hard"]}
          state={selectedGrammar}
          setState={setSelectedGrammar}
        />

        <FilterSection
          title="Text Length"
          options={["short", "medium", "long"]}
          state={selectedLength}
          setState={setSelectedLength}
        />

        <FilterSection
          title="Target Audience"
          options={["kids", "teenagers", "general", "adults"]}
          state={selectedAudience}
          setState={setSelectedAudience}
        />

        <div className="flex justify-end gap-3 mt-8">
          <button
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
