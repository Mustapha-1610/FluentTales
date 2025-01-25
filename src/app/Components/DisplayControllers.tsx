import { FaBook, FaRegKeyboard } from "react-icons/fa6";

export default function DisplayControllers() {
  return (
    <div className="flex justify-center my-4">
      <div className="flex gap-6 self-center text-base text-center">
        <div className="flex items-center gap-3 px-4 py-3 text-black dark:text-white bg-gray-100 dark:bg-[#1f2937] rounded-xl cursor-pointer w-48 h-16 justify-center">
          <FaBook size={24} />
          <div>Comprehension</div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-[#374151] rounded-xl cursor-pointer w-48 h-16 justify-center">
          <FaRegKeyboard size={24} />
          <div>Writing</div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 text-black dark:text-white bg-gray-100 dark:bg-[#1f2937] rounded-xl cursor-pointer w-48 h-16 justify-center">
          <FaBook size={24} />
          <div>Grammar</div>
        </div>
      </div>
    </div>
  );
}
