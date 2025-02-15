import { useState } from "react";
import Filters from "./Filters";
import GeneratedStory from "./GeneratedStoryContainer";
import ComprehensionExercises from "./ComprehensionExercises";
import GenerateExercises from "../../FunctionalityButtonsComponents/GenerateExercises";
import TrueFalseExercises from "./TrueFalseExercises";
import { useLocale } from "next-intl";

export default function GeneratedContentContainer() {
  const [story, setStory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [comprehensionExercises, setComprehensionExercises] = useState(null);
  const [showComprehensionExercises, setShowComprehensionExercises] =
    useState<boolean>(false);
  const [loadingComprehensionExercises, setLoadingComprehensionExercises] =
    useState<boolean>(false);
  const [true_false_exercises, setTrue_False_Exercises] = useState<any[]>([]);
  const [loadingTrue_False_Exercises, setLoading_True_False_Exercises] =
    useState<boolean>(false);
  const [show_true_false_exercises, setShow_True_False_Exercises] =
    useState<boolean>(false);

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  async function regenerateExecersises() {
    try {
      setLoadingComprehensionExercises(true);
      setLoading_True_False_Exercises(true);
      const response = await fetch("/api/regenerate-comprehension-exercises", {
        method: "POST",
        body: JSON.stringify({
          context: story,
          previousExercises: comprehensionExercises,
          true_false_exercises,
        }),
      });
      const res = await response.json();
      console.log(res.data.true_false_exercises);
      setComprehensionExercises(res.data.comprehension_exercises);
      setTrue_False_Exercises(shuffleArray(res.data.true_false_exercises));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComprehensionExercises(false);
      setLoading_True_False_Exercises(false);
    }
  }

  return (
    <>
      <div
        className={` flex flex-col mb-12 py-5 pl-6 mt-10 w-full  bg-gray-50 dark:bg-[#2e2e3e] rounded-2xl shadow-[0px_4px_6px_rgba(0,0,0,0.1)] max-md:pl-5 max-md:max-w-full mr-4`}
      >
        <Filters
          isLoading={loading}
          setStory={setStory}
          setComprehensionExercises={setComprehensionExercises}
          setLoading={setLoading}
          setShowComprehensionExercises={setShowComprehensionExercises}
          setShow_True_False_Exercises={setShow_True_False_Exercises}
          setTrue_False_Exercises={setTrue_False_Exercises}
        />
        <GeneratedStory story={story} isLoading={loading} />

        <div className="flex flex-wrap gap-3 self-end pl-20 mr-6 mt-4 bg-black bg-opacity-0 max-md:pl-5 max-md:mr-2.5">
          <GenerateExercises
            comprehenstionExercises={comprehensionExercises}
            setShowComprehensionExercises={setShowComprehensionExercises}
            contentRegeneration={regenerateExecersises}
            showComprehensionExercises={showComprehensionExercises}
            setShow_True_False_Exercises={setShow_True_False_Exercises}
          />
        </div>
      </div>
      {showComprehensionExercises && (
        <ComprehensionExercises
          comprehension_exercises={comprehensionExercises}
          isLoading={loadingComprehensionExercises}
        />
      )}
      {show_true_false_exercises && (
        <TrueFalseExercises
          true_false_exercises={true_false_exercises}
          isLoading={loadingTrue_False_Exercises}
        />
      )}
      {}
    </>
  );
}
