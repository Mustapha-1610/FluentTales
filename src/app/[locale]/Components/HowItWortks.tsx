"use client";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";

interface HowItWorksModalProps {
  setShowHowItWorksModal: (show: boolean) => void;
}

interface Slide {
  title: string;
  content: string;
  images: string[];
}

export default function HowItWorksModal({
  setShowHowItWorksModal,
}: HowItWorksModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = useTranslations("HowItWorksModal");
  const locale = useLocale();

  const slides: Slide[] = useMemo(
    () => [
      {
        title: t("1Title"),
        content: t("1Content"),
        images: ["/images/how-it-works/1.png"],
      },
      {
        title: t("2Title"),
        content: t("2Content"),
        images: [
          "/images/how-it-works/2.PNG",
          "/images/how-it-works/3.PNG",
          "/images/how-it-works/4.PNG",
          "/images/how-it-works/5.PNG",
          "/images/how-it-works/6.PNG",
        ],
      },
      {
        title: t("3Title"),
        content: t("3Content"),
        images: [
          "/images/how-it-works/7.PNG",
          "/images/how-it-works/8.PNG",
          "/images/how-it-works/9.PNG",
          "/images/how-it-works/10.PNG",
        ],
      },
      {
        title: t("4Title"),
        content: t("4Content"),
        images: [
          "/images/how-it-works/11.PNG",
          "/images/how-it-works/12.PNG",
          "/images/how-it-works/13.PNG",
          "/images/how-it-works/14.PNG",
        ],
      },
      {
        title: t("5Title"),
        content: t("5Content"),
        images: ["/images/how-it-works/15.PNG", "/images/how-it-works/16.PNG"],
      },
    ],
    [t]
  );

  useEffect(() => {
    if (isPaused || slides[currentSlide].images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prev) => (prev + 1) % slides[currentSlide].images.length
      );
    }, 2300);
    return () => clearInterval(interval);
  }, [currentSlide, isPaused, slides]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setShowHowItWorksModal(false);
    }
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-4xl relative">
        <div className="flex gap-2 mb-6 justify-center">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-8 rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-blue-500"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center">
          {/* Image Container */}
          <div
            className="w-full h-64 md:h-80 mb-6 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides[currentSlide].images.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  idx === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={img}
                  alt={`${slides[currentSlide].title} ${idx + 1}`}
                  className="w-full h-full object-cover p-4"
                />
              </div>
            ))}

            {slides[currentSlide].images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides[currentSlide].images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? "bg-blue-500" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Text Content */}
          <div
            dir={locale == "ar" ? "rtl" : "ltr"}
            className="text-center px-4"
          >
            <h3 className="text-2xl font-bold mb-4 dark:text-white max-md:text-lg">
              {slides[currentSlide].title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-md:text-sm">
              {slides[currentSlide].content}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between w-full mt-6">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className={` max-md:text-sm px-4 py-2 rounded-lg max-md:px-3 max-md:py-1 ${
                currentSlide > 0
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {t("Previous")}
            </button>

            <div className="flex gap-4">
              <button
                onClick={() => setShowHowItWorksModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 max-md:px-3 max-md:py-1 max-md:text-sm"
              >
                {t("Skip Tutorial")}
              </button>
              <button
                onClick={handleNextSlide}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 max-md:px-3 max-md:py-1 max-md:text-sm"
              >
                {currentSlide === slides.length - 1
                  ? t("Get Started")
                  : t("Next")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
