import { FaBook, FaRegKeyboard } from "react-icons/fa6";

export default function DisplayControllers() {
  return (
    <>
      <div className="flex gap-6 self-center max-w-full text-base text-center whitespace-nowrap w-[419px]">
        <div className="flex flex-1 gap-3 px-6 py-4 text-black bg-gray-100 rounded-xl max-md:px-5 items-center justify-center cursor-pointer">
          <FaBook />

          <div>Comprehension</div>
        </div>
        <div className="flex flex-1 gap-3 px-6 py-4 text-white bg-zinc-700 rounded-xl max-md:px-5 items-center justify-center cursor-pointer">
          <FaRegKeyboard size={20} className="mb-0.5" />

          <div>Writing</div>
        </div>
      </div>
    </>
  );
}
