import { useState } from "react";
import { VocabularyItem } from "../[locale]/Components/Vocabulary/VocabComponent";
import { useLocale } from "next-intl";

export function useGetGeneratedVerbs() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState("");
  const [vocabulary, setVocabulary] = useState<VocabularyItem | null>(null);
  const locale = useLocale();

  const [previous_generation, setPreviousGeneration] =
    useState<VocabularyItem | null>(null);

  const generateVocabulary = async () => {
    if (!theme.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/vocab-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          previous_generation,
          theme,
          locale:
            locale === "en" ? "English" : locale === "ar" ? "Arabic" : "French",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setVocabulary(data.data);
      } else {
        setError("Error generating vocabulary");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    generateVocabulary,
    vocabulary,
    error,
    setTheme,
    theme,
    isLoading,
  };
}
