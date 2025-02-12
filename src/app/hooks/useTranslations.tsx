// hooks/useTextTranslation.ts
import { useState, useEffect, useRef, useCallback } from "react";

export interface TranslationData {
  translation: string;
  exampleSentence: string;
}

interface UseTextTranslationProps {
  targetLanguage: string;
  maxWordLimit?: number;
}

export const useTextTranslation = ({
  targetLanguage,
  maxWordLimit = 15,
}: UseTextTranslationProps) => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [translationData, setTranslationData] =
    useState<TranslationData | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text && selection?.rangeCount) {
      const wordCount = text.split(/\s+/).length;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setPopupPosition({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      });

      if (wordCount > maxWordLimit) {
        setSelectedText(null);
        setError(`Please select no more than ${maxWordLimit} words.`);
        return;
      }

      setSelectedText(text);
      setError(null);
    } else {
      setSelectedText(null);
      setPopupPosition(null);
    }
  }, [maxWordLimit]);

  const fetchTranslation = useCallback(
    async (text: string) => {
      setIsFetching(true);
      try {
        const response = await fetch("/api/generate-translations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, targetLanguage }),
        });

        if (response.ok) {
          const data = await response.json();
          setTranslationData(data);
        } else {
          setError("Error fetching translation");
        }
      } catch (err) {
        console.error("Translation error:", err);
        setError("Error fetching translation");
      } finally {
        setIsFetching(false);
      }
    },
    [targetLanguage]
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setSelectedText(null);
      setPopupPosition(null);
      setTranslationData(null);
    }
  }, []);

  useEffect(() => {
    if (selectedText) {
      fetchTranslation(selectedText);
    }
  }, [selectedText, fetchTranslation]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      container.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, handleTextSelection]);

  return {
    containerRef,
    selectedText,
    popupPosition,
    translationData,
    isFetching,
    error,
  };
};
