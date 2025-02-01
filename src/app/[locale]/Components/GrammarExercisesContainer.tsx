import { useState } from "react";
import VideoCarousel from "./CarouselTest";
import GrammarExercise, { ExerciseData } from "./GrammarExercises";
import GrammarFilter from "./GrammarFilters";

export default function GrammarExercisesContainer() {
  const [exerciseData, setExerciseData] = useState<ExerciseData | null>(null);

  return (
    <>
      <GrammarFilter setExerciseData={setExerciseData} />
      {exerciseData && <GrammarExercise exerciseData={exerciseData} />}
    </>
  );
}
