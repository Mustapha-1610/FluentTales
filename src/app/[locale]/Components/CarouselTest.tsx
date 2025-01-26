import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface VideoData {
  id: string;
  creatorName: string;
  creatorUrl: string;
}

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

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
  const videos = [
    {
      id: "ZIoKZ_1tAV8",
      creatorName: "Rick Astley",
      creatorUrl: "https://www.youtube.com/watch?v=ZIoKZ_1tAV8&t=872s",
    },
    {
      id: "dQw4w9WgXcQ", // Example YouTube video ID
      creatorName: "Rick Astley",
      creatorUrl: "https://www.youtube.com/@RickAstleyYT",
    },
    {
      id: "dQw4w9WgXcQ", // Example YouTube video ID
      creatorName: "Rick Astley",
      creatorUrl: "https://www.youtube.com/@RickAstleyYT",
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-[900px] max-w-[1000px]">
        <button
          onClick={prevSlide}
          className={`p-3 transition-all  rounded-full   ${
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
              src={`https://www.youtube.com/embed/${videos[currentIndex].id}`}
              title="YouTube video player"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
            />
          </div>

          <div className="text-center mt-4">
            <span className="text-gray-700 dark:text-gray-300">
              Video Creator:{" "}
              <a
                href={videos[currentIndex].creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors "
              >
                {videos[currentIndex].creatorName}
              </a>
            </span>
          </div>
        </div>

        <button
          onClick={nextSlide}
          className={`p-3 transition-all  rounded-full    ${
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

      <div className="flex justify-center gap-2 mt-6">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all  ${
              index === currentIndex
                ? "w-6 bg-blue-500"
                : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
