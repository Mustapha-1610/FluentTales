import { useLocale, useTranslations } from "next-intl";

interface Props {
  noun: {
    word: string;
    article: string;
    plural: string;
    translation: string;
    example: string;
  };
}
export default function GeneratedNouns({ noun }: Props) {
  const t = useTranslations("VocabSection");
  const locale = useLocale();

  return (
    <>
      <div className="  p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-baseline gap-2 mb-2">
          <span
            className={` capitalize text-lg font-semibold ${
              noun.article === "der"
                ? "text-red-500"
                : noun.article === "die"
                ? "text-blue-500"
                : "text-green-500"
            }`}
          >
            {noun.article}
          </span>
          <span className="text-xl dark:text-white">{noun.word}</span>
        </div>
        <p
          dir={locale == "ar" ? "rtl" : "ltr"}
          className="text-gray-600 dark:text-gray-300 text-sm"
        >
          {t("Plural")} <span className="font-medium">{noun.plural}</span>
          <br />
          {t("Translation")}{" "}
          <span className="font-medium">{noun.translation}</span>
          <br />
          {t("ExampleTranslations")}{" "}
          <span className="italic">{noun.example}</span>
        </p>
      </div>
    </>
  );
}
