import { useLocale } from "next-intl";
import React, { useState, useEffect, useRef } from "react";
import { PulseLoader } from "react-spinners";
import { FaLanguage, FaExclamationTriangle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  story: string | null;
  isLoading: boolean;
}

const GeneratedStory: React.FC<Props> = ({ story, isLoading }) => {
  const locale = useLocale();
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [translationData, setTranslationData] = useState<{
    translation: string;
    exampleSentence: string;
  } | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const MAX_WORD_LIMIT = 15;

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text && selection?.rangeCount) {
      const wordCount = text.split(" ").length;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setPopupPosition({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      });

      if (wordCount > MAX_WORD_LIMIT) {
        setSelectedText(null);
        setError(`Please select no more than ${MAX_WORD_LIMIT} words.`);
        return;
      }

      setSelectedText(text);
      setError(null);
    } else {
      setSelectedText(null);
      setPopupPosition(null);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setSelectedText(null);
      setPopupPosition(null);
      setTranslationData(null);
    }
  };

  const fetchTranslation = async (text: string) => {
    setIsFetching(true);
    try {
      const response = await fetch("/api/generateTranslation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          targetLanguage:
            locale === "en" ? "English" : locale === "fr" ? "French" : "Arabic",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTranslationData(data);
      } else {
        setTranslationData({
          translation: "Error fetching translation",
          exampleSentence: "",
        });
      }
    } catch (error) {
      console.error("Error fetching translation:", error);
      setTranslationData({
        translation: "Error fetching translation",
        exampleSentence: "",
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (selectedText) {
      fetchTranslation(selectedText);
    }
  }, [selectedText]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("mouseup", handleTextSelection);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      if (container) {
        container.removeEventListener("mouseup", handleTextSelection);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative self-start px-4 pt-3 pb-4 mt-4 mr-6 text-lg leading-6 flex-grow text-gray-800 dark:bg-gray-600 dark:text-gray-200 rounded-xl border border-solid bg-gray-50 dark:border-gray-500 border-gray-300"
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
              Translation <FaLanguage className="ml-2 text-blue-500" />
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
              <p className="font-bold">Word/Text:</p>
              <p className="mb-2">{selectedText}</p>
              <p className="font-bold">Translation:</p>
              <p className="mb-2">{translationData.translation}</p>
              <p className="font-bold">Example Sentence:</p>
              <p>{translationData.exampleSentence}</p>
            </>
          ) : (
            <p>Error loading translation.</p>
          )}
        </div>
      )}
    </>
  );
};

export default GeneratedStory;
