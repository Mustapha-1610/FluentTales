import React, { useState, useEffect, useRef } from "react";
import { PulseLoader } from "react-spinners";

interface Props {
  story: string | null;
  isLoading: boolean;
}

const GeneratedStory: React.FC<Props> = ({ story, isLoading }) => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text && selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text);
      setPopupPosition({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      });
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
    }
  };

  useEffect(() => {
    const translateText = async (text: string) => {
      // Simulate translation for now (replace with an actual translation API later)
      const fakeTranslation = `Translation of "${text}"`;
      setTranslation(fakeTranslation);
    };

    if (selectedText) {
      translateText(selectedText);
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
      {popupPosition && selectedText && (
        <div
          className="absolute z-50 px-3 py-2 rounded-lg shadow-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 text-sm text-black dark:text-white"
          style={{
            top: popupPosition.y + 20, // Offset for better visibility
            left: popupPosition.x,
          }}
        >
          {translation ? (
            <p>{translation}</p>
          ) : (
            <div className="flex items-center justify-center">
              <PulseLoader color="#4b5563" size={6} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GeneratedStory;
