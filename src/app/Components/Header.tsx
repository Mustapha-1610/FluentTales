import * as React from "react";
import { FaQuestion } from "react-icons/fa6";
import { TbConfetti } from "react-icons/tb";

export default function Header() {
  return (
    <div className="px-11 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-4 max-md:flex-col">
        <div className="flex flex-col w-[41%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mb-14 mt-32 text-gray-800 dark:text-gray-200 max-md:mt-10">
            <div className="self-start text-4xl font-bold leading-none text-center">
              FluentTales
            </div>
            <div className="mt-8 text-lg leading-6 text-gray-700 dark:text-gray-400">
              Where your language learning journey transforms into an engaging
              and personalized experience. Create unique stories that capture
              your interests, dive into interactive exercises, and improve your
              reading, listening, and writing skills with real-time AI feedback.
            </div>
          </div>
          <div className="flex gap-12">
            <button className="px-5 py-3 flex flex-cols bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600">
              <TbConfetti className="mr-2" size={20} />
              Let's Start
            </button>
            <button className="px-5 py-3 flex flex-cols bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600">
              <FaQuestion className="mr-2 mt-0.5" size={17} />
              How It Works
            </button>
          </div>
        </div>
        <div className="flex flex-col ml-8 w-[57%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8d4bc422b030f18ea71c5f1242123ad8c04257dc544f31d022c138d95c26af?placeholderIfAbsent=true&apiKey=452d394c7c1e42459c0e2415b6f84ad2"
            className="object-contain w-full aspect-[1.5] max-md:mt-10 max-md:max-w-full ml-10"
          />
        </div>
      </div>
    </div>
  );
}
