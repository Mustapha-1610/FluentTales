import CopyButton from "../FunctionalityButtonsComponents/CopyButton";
import DownloadButton from "../FunctionalityButtonsComponents/DownloadButton";
import GenerateExercises from "../FunctionalityButtonsComponents/GenerateExercises";
import HearingButton from "../FunctionalityButtonsComponents/HearingButton";
import TranslationButton from "../FunctionalityButtonsComponents/Translate";

export default function FunctionButtons() {
  return (
    <>
      <div className="flex flex-wrap gap-3 self-end pl-20 mr-6 mt-4 bg-black bg-opacity-0 max-md:pl-5 max-md:mr-2.5">
        <TranslationButton />
        <DownloadButton />
        <CopyButton />
        <HearingButton />
        <GenerateExercises />
      </div>
    </>
  );
}
