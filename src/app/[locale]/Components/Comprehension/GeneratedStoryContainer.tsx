import { useLocale } from "next-intl";
import React from "react";
import { PulseLoader } from "react-spinners";
import { useTextTranslation } from "@/app/hooks/useTranslations";
import TranslationPopUp from "./TranslationsPopUp";

interface Props {
  story: string | null;
  isLoading: boolean;
}

const GeneratedStory: React.FC<Props> = ({ story, isLoading }) => {
  const locale = useLocale();
  const targetLanguage =
    locale === "en" ? "English" : locale === "fr" ? "French" : "Arabic";

  const {
    containerRef,
    selectedText,
    popupPosition,
    translationData,
    isFetching,
    error,
  } = useTextTranslation({
    targetLanguage,
    maxWordLimit: 15,
  });

  return (
    <div>
      <div
        ref={containerRef}
        className="relative self-start px-4 pt-3 pb-4 mt-4 mr-6 text-lg max-md:text-base leading-6 flex-grow text-gray-800 dark:bg-gray-600 dark:text-gray-200 rounded-xl border border-solid bg-gray-50 dark:border-gray-500 border-gray-300"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-xl">
            <PulseLoader color="#4b5563" size={10} />
          </div>
        )}
        {story ? (
          story
        ) : (
          <>
            Willkommen auf meiner Webseite! Ich bin so froh, dass du hier bist.
            Meine Mission ist es, dir zu helfen, die wunderbare Welt der
            deutschen Sprache zu entdecken und zu lernen. Egal, ob du gerade
            erst anfängst oder schon fortgeschritten bist, ich hoffe, dass du
            hier wertvolle Ressourcen und Inspiration findest. Viel Spaß beim
            Lernen und lass uns gemeinsam auf dieser spannenden Reise
            voranschreiten. Du bist hier herzlich willkommen, und ich freue mich
            darauf, dich zu unterstützen!
          </>
        )}
      </div>
      {popupPosition && (
        <TranslationPopUp
          error={error}
          isFetching={isFetching}
          popupPosition={popupPosition}
          selectedText={selectedText!}
          translationData={translationData}
        />
      )}
    </div>
  );
};

export default GeneratedStory;
