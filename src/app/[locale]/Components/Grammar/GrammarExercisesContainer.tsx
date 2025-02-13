import { useState } from "react";
import { ExerciseData } from "./FillInTheBlanksExercise";
import GrammarFilter from "./GrammarFilters";
import SentenceRearrangementExercises, {
  SentenceRearrangementExerciseData,
} from "./SentenceRearrangementExercises";
import FillInTheBlanksExercise from "./FillInTheBlanksExercise";
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
      {exerciseData && <FillInTheBlanksExercise exerciseData={exerciseData} />}
      {sentence_rearrangement_exercises && (
        <SentenceRearrangementExercises
          exercises={sentence_rearrangement_exercises}
        />
      )}
    </>
  );
}
