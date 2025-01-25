import { IoIosCloudDownload } from "react-icons/io";

export default function DownloadButton() {
  return (
    <>
      <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-200 rounded-lg cursor-pointer">
        <IoIosCloudDownload color="black" size={21} />
        <div className="text-base leading-none text-neutral-900">Download</div>
      </div>
    </>
  );
}
