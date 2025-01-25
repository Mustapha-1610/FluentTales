"use client";
import React, { useState, useEffect } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import Header from "./Components/Header";
import DisplayControllers from "./Components/DisplayControllers";
import GeneratedContentContainer from "./Components/GeneratedContentContainer";
import { useLocale } from "next-intl";

import LanguageChanger from "./Components/LanguageSelector";

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve theme preference from localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const locale = useLocale();

  return (
    <div
      className={`pb-16 min-h-screen flex flex-col items-center overflow-x-hidden ${
        darkMode ? "dark:bg-[#1e1e2f] dark:text-white" : "bg-white text-black"
      }`}
    >
      <button
        className="absolute top-0 right-0 mt-10 mr-12 px-2 py-1 flex items-center gap-2 transition-colors max-md:mt-6 max-md:mr-6 max-md:px-1 max-md:py-0.5"
        onClick={toggleTheme}
      >
        {darkMode ? (
          <IoIosSunny size={20} color="#ffcc00" />
        ) : (
          <IoIosMoon size={20} color="#141414" />
        )}
      </button>

      <div className="absolute top-0 right-0 mt-10 mr-24 max-md:mt-6 max-md:mr-14">
        <LanguageChanger />
      </div>

      <div className="max-w-[1330px] w-full px-6 mt-32 max-md:mt-20">
        <Header />
        <div className="flex flex-col rounded-none mt-44 mb-16 max-md:mt-24 max-md:mb-8">
          <DisplayControllers />
          <GeneratedContentContainer />
        </div>
      </div>
    </div>
  );
}
