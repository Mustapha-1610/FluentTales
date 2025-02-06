import { useState } from "react";
import { FaBook, FaRegKeyboard } from "react-icons/fa6";
import { TbTextGrammar } from "react-icons/tb";
import { useTranslations } from "use-intl";

interface Props {
  setSelectedButton: (value: "Comprehension" | "Grammar" | "Writing") => void;
  selectedButton: "Comprehension" | "Grammar" | "Writing";
}

export default function DisplayControllers({
  selectedButton,
  setSelectedButton,
}: Props) {
  const handleButtonClick = (
    buttonName: "Comprehension" | "Grammar" | "Writing"
  ) => {
    setSelectedButton(buttonName);
  };

  const getButtonStyles = (buttonName: string) => {
    const baseStyles =
      "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer w-full h-16 justify-center"; // w-full for responsiveness
    const selectedStyles =
      "text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-[#374151]";
    const unselectedStyles =
      "text-black dark:text-white bg-gray-100 dark:bg-[#1f2937]";

    return `${baseStyles} ${
      selectedButton === buttonName ? selectedStyles : unselectedStyles
    }`;
  };
  const t = useTranslations("DisplayControllers");
  return (
    <div className="flex justify-center my-4">
      <div className="flex flex-col md:flex-row gap-6 self-center text-base text-center w-full max-w-fit">
        {" "}
        <div
          className={getButtonStyles("Comprehension")}
          onClick={() => handleButtonClick("Comprehension")}
        >
          <FaBook size={20} />
          <div>{t("Comprehension")}</div>
        </div>
        <div
          className={getButtonStyles("Grammar")}
          onClick={() => handleButtonClick("Grammar")}
        >
          <TbTextGrammar size={23} />
          <div>{t("Grammar")}</div>
        </div>
        <div
          className={getButtonStyles("Writing")}
          onClick={() => handleButtonClick("Writing")}
        >
          <FaRegKeyboard size={23} />
          <div>{t("Writing")}</div>
        </div>
      </div>
    </div>
  );
}
