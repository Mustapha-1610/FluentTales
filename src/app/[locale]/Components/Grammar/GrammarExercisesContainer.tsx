import { useState } from "react";
import GrammarExercise, { ExerciseData } from "./GrammarExercises";
import GrammarFilter from "./GrammarFilters";
import SentenceRearrangementExercises, {
  SentenceRearrangementExerciseData,
} from "./SentenceRearrangementExercises";
export default function GrammarExercisesContainer() {
  const [exerciseData, setExerciseData] = useState<ExerciseData | null>(null);
  const [
    sentence_rearrangement_exercises,
    setSentence_Rearrangement_Exercises,
  ] = useState<null | SentenceRearrangementExerciseData[]>(null);
  return (
    <>
      <GrammarFilter
        setSentenceRearrangementExercises={setSentence_Rearrangement_Exercises}
        setExerciseData={setExerciseData}
      />
      {exerciseData && <GrammarExercise exerciseData={exerciseData} />}
      {sentence_rearrangement_exercises && (
        <SentenceRearrangementExercises
          exercises={sentence_rearrangement_exercises}
        />
      )}
    </>
  );
}
