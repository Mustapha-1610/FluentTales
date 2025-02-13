"use client";
import { useState } from "react";
import CorrectionModal from "./CorrectionModal";
import { useLocale } from "next-intl";

export default function WritingAssistant() {
  const [text, setText] = useState("");
  const [level, setLevel] = useState("A1");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const locale = useLocale();
  const handleAnalyzeText = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/analyze-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          level,
          language:
            locale === "fr" ? "French" : locale === "ar" ? "Arabic" : "English",
        }),
      });

      if (!response.ok) throw new Error("Analysis failed");
      const result = await response.json();
      setAnalysisResult(result);
      setShowModal(true);
    } catch (err) {
      setError("Failed to analyze text");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full  mx-auto p-4">
      <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        {/* Level Selection */}
        <div className="flex flex-col w-full">
          <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
            You German Level
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-none "
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {["A1", "A2", "B1", "B2"].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Text Input */}
        <div className="flex flex-col w-full">
          <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
            Your Text
          </label>
          <textarea
            className="w-full h-60 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-none  resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your German text here..."
          />
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span
              className={text.length >= 300 ? "text-green-600" : "text-red-600"}
            >
              {text.length}/300
            </span>
            {text.length < 300 && (
              <span className="ml-2">Minimum 300 characters required</span>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleAnalyzeText}
          disabled={text.length < 300 || isLoading}
          className={`mt-2    px-6 py-3 rounded-lg font-semibold transition-colors ${
            text.length >= 300 && !isLoading
              ? "bg-blue-100 text-black   dark:bg-blue-900 dark:text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Analyzing..." : "Generate AI Review"}
        </button>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>

      {/* Results Modal */}
      {showModal && analysisResult && (
        <CorrectionModal
          result={analysisResult}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
