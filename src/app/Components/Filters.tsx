import { FaWandMagicSparkles } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

export default function Filters() {
  return (
    <>
      <div className="flex flex-wrap gap-5 justify-between pr-4 w-full text-base max-md:max-w-full items-center">
        <div className="flex gap-5">
          <div className="flex gap-2 px-4 py-2 bg-blue-100 rounded-xl items-center">
            <div className="text-zinc-700 font-bold">Language:</div>
            <div className="font-medium text-black">German</div>
          </div>
          <div className="flex gap-2 px-4 py-2 bg-blue-100 rounded-xl items-center">
            <div className="text-zinc-700 font-bold">Level:</div>
            <div className="font-medium text-black">B1</div>
          </div>
        </div>
        <div className="flex gap-2 px-3 py-3 mr-2 text-black bg-blue-100 rounded-xl items-center">
          <IoMdSettings size={20} />

          <div>Edit Filters</div>
        </div>
      </div>

      <div className="flex mt-4 mr-4 items-center ">
        <input
          type="text"
          placeholder="Enter context or theme for your story..."
          className="flex-grow px-4 py-3 bg-white text-black border border-solid rounded-xl shadow-sm border-gray-300"
        />
        <div className="flex gap-3.5 px-4 mr-2 py-3 text-center text-white whitespace-nowrap bg-neutral-800 rounded-xl items-center ml-4 cursor-pointer">
          <FaWandMagicSparkles />

          <div>Generate</div>
        </div>
      </div>
    </>
  );
}
