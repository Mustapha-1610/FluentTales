"use client";
import { useTranslations } from "next-intl";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { PiReadCvLogoBold } from "react-icons/pi";

interface ContactMeModalProps {
  setShowContactMeModal: (show: boolean) => void;
}

export default function ContactMeModal({
  setShowContactMeModal,
}: ContactMeModalProps) {
  const t = useTranslations("Header");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl relative text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t("ContactMe")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t("ContactMeDescription")}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://www.linkedin.com/in/mustaphatalbi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <FaLinkedin className="text-xl" /> LinkedIn
          </a>
          <a
            href="https://github.com/Mustapha-1610"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            <FaGithub className="text-xl" /> GitHub
          </a>
          <a
            href="/MustaphaTalbi_CV.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <PiReadCvLogoBold className="text-xl" />
            {t("Resume")}
          </a>
        </div>

        {/* Contact Info */}
        <div className="text-gray-700 dark:text-gray-300">
          <p className="flex items-center justify-center gap-2 mb-2">
            <MdEmail className="text-xl" /> TalbiMustapha.Work@outlook.com
          </p>
          <p className="flex items-center justify-center gap-2">
            <MdPhone className="text-xl" /> +216 52 491 002
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setShowContactMeModal(false)}
          className="mt-6 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          {t("Close")}
        </button>
      </div>
    </div>
  );
}
