import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import HowItWorksModal from "./HowItWortks";
import ContactMeModal from "./ContactMeModal";
interface Props {
  setShowHowItWorksModal: (show: boolean) => void;
}
export default function Header() {
  const [showHowItWorksModal, setShowHowItWorksModal] =
    React.useState<boolean>(false);
  const [showContactMeModal, setShowContactMeModal] =
    React.useState<boolean>(false);
  const t = useTranslations("Header");
  const locale = useLocale();
  function handleScroll() {
    const targetElement = document.getElementById("content-section");
    if (targetElement) {
      const offsetTop = targetElement.offsetTop;

      const offsetAdjustment = -80;

      window.scrollTo({
        top: offsetTop + offsetAdjustment,
        behavior: "smooth",
      });
    }
  }
  return (
    <div
      dir={locale == "ar" ? "rtl" : "ltr"}
      className="px-11 max-md:px-5 max-md:max-w-full"
    >
      <div className="flex gap-4 max-md:flex-col max-md:items-center">
        <div className="flex flex-col w-[41%] max-md:w-full max-md:text-center">
          <div className="flex flex-col mb-14 mt-32 text-gray-800 dark:text-gray-200 max-md:mt-10">
            <div className="self-start text-4xl font-bold leading-none max-md:self-center">
              Fluent Tales
            </div>
            <div
              dir={locale == "ar" ? "rtl" : "ltr"}
              className="mt-8 text-lg leading-6 text-gray-700 dark:text-gray-400 max-md:text-sm"
            >
              {t("about")}
            </div>
          </div>
          <div className="flex gap-12 max-md:gap-4 max-md:flex-col max-md:items-center">
            <button
              className="px-5 py-3 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 max-md:px-4 max-md:py-3 max-md:text-sm"
              onClick={() => setShowHowItWorksModal(true)}
            >
              {t("HowItWorks")}
            </button>
            <button
              onClick={handleScroll}
              className="px-5 py-3 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 max-md:px-4 max-md:py-3 max-md:text-sm"
            >
              {t("LetsStart")}
            </button>
            <button
              onClick={() => setShowContactMeModal(true)}
              className="px-5 py-3 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 max-md:px-4 max-md:py-3 max-md:text-sm"
            >
              {t("ContactMe")}
            </button>
          </div>
        </div>
        <div className="flex ml-8 w-[57%] max-md:ml-0 max-md:w-full max-md:justify-center">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8d4bc422b030f18ea71c5f1242123ad8c04257dc544f31d022c138d95c26af?placeholderIfAbsent=true&apiKey=452d394c7c1e42459c0e2415b6f84ad2"
            className="object-contain w-full aspect-[1.5] max-md:max-w-full max-md:w-5/5"
          />
        </div>
      </div>
      {showHowItWorksModal && (
        <HowItWorksModal setShowHowItWorksModal={setShowHowItWorksModal} />
      )}
      {showContactMeModal && (
        <ContactMeModal setShowContactMeModal={setShowContactMeModal} />
      )}
    </div>
  );
}
