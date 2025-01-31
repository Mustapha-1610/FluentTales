import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLocale } from "next-intl";
import { videoData } from "@/app/utils/videoData";

interface VideoCarouselProps {
  level: string;
  course: string;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ level, course }) => {
  const locale = useLocale(); // Get user's language
  const videos = videoData?.[level]?.[course]?.[locale] || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (videos.length === 0) {
    return <p className="text-center text-gray-500">No videos available.</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-[900px] max-w-[1000px]">
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
              src={`https://www.youtube.com/embed/${videos[currentIndex]}`}
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
            currentIndex === videos.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
          disabled={currentIndex === videos.length - 1}
        >
          <IoIosArrowForward
            size={35}
            className="text-gray-800 dark:text-gray-200"
          />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
