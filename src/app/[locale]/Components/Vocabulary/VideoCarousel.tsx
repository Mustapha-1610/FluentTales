import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VideoData } from "@/app/utils/videoData";
import { useTranslations } from "next-intl";

function getRandomItems(array: string[], count = 3): string[] {
  const result = new Set<string>();
  while (result.size < count && result.size < array.length) {
    const randomIndex = Math.floor(Math.random() * array.length);
    result.add(array[randomIndex]);
  }
  return Array.from(result);
}

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [randomVideos, setRandomVideos] = useState<string[]>([]);

  useEffect(() => {
    setRandomVideos(getRandomItems(VideoData));
  }, []);

  const nextSlide = () => {
    if (currentIndex < randomVideos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const t = useTranslations("VocabSection");
  if (randomVideos.length === 0) {
    return <p className="text-center text-gray-500"> {t("NoVideos")} </p>;
  }

  return (
    <div className="flex flex-col items-center mb-10">
      <div className="flex justify-between items-center w-[100%] max-w-[900px]  xs:max-w-[700px]">
        {" "}
        <button
          onClick={prevSlide}
          className={`p-3 transition-all rounded-full ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={currentIndex === 0}
        >
          <IoIosArrowBack
            size={35}
            className="text-gray-800 dark:text-gray-200"
          />
        </button>
        <div className="flex-grow mx-4">
          <div className="relative pt-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${
                randomVideos[currentIndex].split("v=")[1]
              }`}
              title="YouTube video player"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
            />
          </div>
        </div>
        <button
          onClick={nextSlide}
          className={`p-3 transition-all rounded-full ${
            currentIndex === randomVideos.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
          disabled={currentIndex === randomVideos.length - 1}
        >
          <IoIosArrowForward
            size={35}
            className="text-gray-800 dark:text-gray-200"
          />
        </button>
      </div>
    </div>
  );
}
