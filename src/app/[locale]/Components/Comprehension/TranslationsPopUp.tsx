import { TranslationData } from "@/app/hooks/useTranslations";
import { useTranslations } from "next-intl";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa6";
import { PulseLoader } from "react-spinners";

interface Props {
  popupPosition: {
    x: number;
    y: number;
  };
  translationData: TranslationData | null;
  selectedText: string;
  error: any;
  isFetching: boolean;
}
export default function TranslationPopUp({
  popupPosition,
  translationData,
  selectedText,
  error,
  isFetching,
}: Props) {
  const t = useTranslations("ComprehensionExercises");
  return (
    <>
      <div
        className="absolute z-50 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 text-base text-black dark:text-white"
        style={{
          top: popupPosition.y + 20,
          left: popupPosition.x,
          minWidth: "300px",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-base flex items-center">
            {t("Translation")} <FaLanguage className="ml-2 text-blue-500" />
          </h4>
        </div>
        {error ? (
          <div className="flex items-center text-yellow-500">
            <FaExclamationTriangle className="mr-2" /> {error}
          </div>
        ) : isFetching ? (
          <div className="flex items-center justify-center">
            <PulseLoader color="#4b5563" size={6} />
          </div>
        ) : translationData ? (
          <>
            <p className="font-bold"> {t("Word")} </p>
            <p className="mb-2">{selectedText}</p>
            <p className="font-bold">{t("Translation")}:</p>
            <p className="mb-2">{translationData.translation}</p>
            <p className="font-bold">{t("Example")}:</p>
            <p>{translationData.exampleSentence}</p>
          </>
        ) : (
          <p>Error loading translation.</p>
        )}
      </div>
    </>
  );
}
