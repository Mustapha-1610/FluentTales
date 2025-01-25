import { MdGTranslate } from "react-icons/md";

export default function TranslationButton() {
  return (
    <>
      <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-200 rounded-lg cursor-pointer">
        <MdGTranslate color="black" size={21} />
        <div className="text-base leading-none text-neutral-900">Translate</div>
      </div>
    </>
  );
}
