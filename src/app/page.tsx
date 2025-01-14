"use client";
import React, { useState } from "react";
import { ComprehensionExercises } from "./Components/ComprehensionExercises";
import Header from "./Components/Header";
import DisplayControllers from "./Components/DisplayControllers";
import Filters from "./Components/Filters";
import GeneratedStory from "./Components/GeneratedStoryContainer";
import FunctionButtons from "./Components/FunctionButtons";
import CorrectionModal from "./Components/CorrectionModal";
import TranslationContainer from "./Components/TranslationContainer";
import { IoLanguage } from "react-icons/io5";
import { IoIosMoon, IoIosSunny } from "react-icons/io";

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.remove("dark");
    } else {
      htmlElement.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        darkMode ? "dark:bg-[#1e1e2f] dark:text-white" : "bg-white text-black"
      }`}
    >
      <button
        className="absolute top-0 right-0 mt-10 mr-12 px-2 py-1 flex items-center gap-2 transition-colors"
        onClick={toggleTheme}
      >
        {darkMode ? (
          <IoIosSunny size={20} color="#ffcc00" />
        ) : (
          <IoIosMoon size={20} color="#141414" />
        )}
      </button>
      <button className="absolute top-0 right-0 mt-10 mr-24 px-2 py-1 flex items-center gap-2 transition-colors">
        <h1>EN</h1>
        <IoLanguage size={20} color={`${darkMode ? "#b0b0b0" : "#141414"}`} />
      </button>
      <div className="max-w-[1330px] w-full px-6 mt-32">
        <Header />
        <div className="flex flex-col rounded-none mt-44 mb-16">
          <DisplayControllers />
          <div
            className={`flex flex-col py-5 pl-6 mt-10 w-full ${
              darkMode ? "bg-[#2e2e3e]" : "bg-gray-50"
            } rounded-2xl shadow-[0px_4px_6px_rgba(0,0,0,0.1)] max-md:pl-5 max-md:max-w-full mr-4`}
          >
            <Filters />
            <GeneratedStory />
            {/* <TranslationContainer /> */}
            <FunctionButtons />
          </div>
        </div>
        {/* <ComprehensionExercises /> */}
        {/* <CorrectionModal /> */}
      </div>
    </div>
  );
}
