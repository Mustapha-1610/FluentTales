import { HiSpeakerWave } from "react-icons/hi2";

export default function HearingButton() {
  return (
    <>
      <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-200 rounded-lg cursor-pointer">
        <HiSpeakerWave color="black" size={20} />
        <div className="text-base leading-none text-neutral-900">Listen</div>
      </div>
    </>
  );
}
