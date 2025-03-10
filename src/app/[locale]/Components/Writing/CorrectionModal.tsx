"use client";
import { useLocale, useTranslations } from "next-intl";
import { ReactNode, useEffect } from "react";

// Type definitions
interface GrammarTip {
  title: string;
  description: string;
}

interface AnalysisResult {
  generalReview: string;
  grammarTips: GrammarTip[];
  missingWords: string[];
}

interface CorrectionModalProps {
  result: AnalysisResult;
  onClose: () => void;
}

interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const Section = ({ title, icon, children, className }: SectionProps) => (
  <div className={className}>
    <div className="flex items-center gap-2 mb-3">
      <span className="text-lg max-md:text-base">{icon}</span>
      <h3 className="text-lg font-semibold text-black dark:text-white max-md:text-base">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

export default function CorrectionModal({
  result,
  onClose,
}: CorrectionModalProps) {
  useEffect(() => {
    const handleEscape = (e: any) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  const hasGrammarTips = result.grammarTips.length > 0;
  const locale = useLocale();
  const t = useTranslations("WritingSection");
  return (
    <div
      dir={locale == "ar" ? "rtl" : "ltr"}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="flex flex-col bg-white dark:bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl font-semibold text-black dark:text-white max-md:text-xl">
              {t("WritingAnalysis")}
            </p>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              ✕
            </button>
          </div>

          {/* General Review */}
          <Section title={t("GeneralReview")} icon="📝">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-gray-700 dark:text-gray-300 max-md:text-sm">
              {result.generalReview}
            </div>
          </Section>

          {/* Grammar Tips */}
          <Section title={t("GrammarTips")} icon="🔍" className="mt-6">
            <div className="space-y-3">
              {hasGrammarTips ? (
                result.grammarTips.map((tip, index) => (
                  <div
                    key={index}
                    dir={locale == "ar" ? "rtl" : "ltr"}
                    className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      {tip.title}
                    </h3>
                    <p className="mt-1 text-gray-700 dark:text-gray-300 max-md:text-sm">
                      {tip.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                  <p className="text-green-800 dark:text-green-200">
                    {t("Noissues")}
                  </p>
                </div>
              )}
            </div>
          </Section>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-blue-100 dark:bg-blue-900 dark:text-white text-black  rounded-lg  hover:opacity-90 transition-opacity max-md:text-sm"
          >
            {t("GotIt")}
          </button>
        </div>
      </div>
    </div>
  );
}
