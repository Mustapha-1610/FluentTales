"use client";
import React, { useState } from "react";
import Header from "./Components/Header";
import DisplayControllers from "./Components/DisplayControllers";
import Filters from "./Components/Filters";
import GeneratedStory from "./Components/GeneratedStoryContainer";
import FunctionButtons from "./Components/FunctionButtons";
import { IoLanguage } from "react-icons/io5";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import GeneratedContentContainer from "./Components/GeneratedContentContainer";

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
          <GeneratedContentContainer />
        </div>
        {/* <ComprehensionExercises /> */}
        {/* <CorrectionModal /> */}
      </div>
    </div>
  );
}
