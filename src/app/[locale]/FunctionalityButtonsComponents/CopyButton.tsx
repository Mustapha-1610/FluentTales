import { FaRegCopy } from "react-icons/fa6";

export default function CopyButton() {
  return (
    <>
      <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-200 rounded-lg cursor-pointer">
        <FaRegCopy color="black" size={21} />
        <div className="text-base leading-none text-neutral-900">Copy</div>
      </div>
    </>
  );
}
