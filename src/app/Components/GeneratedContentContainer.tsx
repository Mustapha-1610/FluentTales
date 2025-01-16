import { useState } from "react";
import Filters from "./Filters";
import FunctionButtons from "./FunctionButtons";
import GeneratedStory from "./GeneratedStoryContainer";
import ComprehensionExercises from "./ComprehensionExercises";

export default function GeneratedContentContainer() {
  const [story, setStory] = useState<string | null>(null);
  const [comprehensionExercises, setComprehensionExercises] = useState(null);

  return (
    <>
      <div
        className={` flex flex-col py-5 pl-6 mt-10 w-full  bg-gray-50 dark:bg-[#2e2e3e] rounded-2xl shadow-[0px_4px_6px_rgba(0,0,0,0.1)] max-md:pl-5 max-md:max-w-full mr-4`}
      >
        <Filters
          setStory={setStory}
          setComprehensionExercises={setComprehensionExercises}
        />
        <GeneratedStory story={story} />
        {/* <TranslationContainer /> */}

        <FunctionButtons />
      </div>
      {comprehensionExercises && (
        <ComprehensionExercises
          comprehension_exercises={comprehensionExercises}
        />
      )}
    </>
  );
}
