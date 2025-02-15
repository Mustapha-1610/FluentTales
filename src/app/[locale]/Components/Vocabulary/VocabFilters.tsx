import { useLocale, useTranslations } from "next-intl";

interface Props {
  theme: string;
  setTheme: (theme: string) => void;
  generateVocabulary: () => void;
  isLoading: boolean;
  setShowSuggestionsModal: (show: boolean) => void;
}
export default function VocabFilters({
  generateVocabulary,
  isLoading,
  setShowSuggestionsModal,
  theme,
  setTheme,
}: Props) {
  const t = useTranslations("VocabSection");
  const locale = useLocale();

  return (
    <>
      <div
        dir={locale == "ar" ? "rtl" : "ltr"}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 mb-8 w-full"
      >
        <div className="flex flex-col md:flex-row gap-4  w-full">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("Theme")}
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:outline-none"
              placeholder={t("Example")}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-start md:items-end">
            <button
              onClick={() => setShowSuggestionsModal(true)}
              className="flex justify-center items-center gap-2 px-3 py-3 w-full md:w-auto text-gray-800 dark:text-gray-100 bg-blue-50 dark:bg-blue-900 rounded-xl cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
            >
              {t("Suggestions")}
            </button>
            <button
              onClick={generateVocabulary}
              disabled={!theme.trim() || isLoading}
              className={`px-6 py-3 rounded-lg font-medium w-full md:w-auto transition-colors ${
                isLoading || !theme.trim()
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {isLoading ? t("Loading") : t("Generate")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
