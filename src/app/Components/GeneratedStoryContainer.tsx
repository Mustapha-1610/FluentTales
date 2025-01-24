import { ClipLoader, PulseLoader } from "react-spinners";

interface Props {
  story: string | null;
  isLoading: boolean;
}

export default function GeneratedStory({ story, isLoading }: Props) {
  return (
    <>
      <div className="relative self-start px-4 pt-3 pb-4 mt-4 mr-6 text-lg leading-6 flex-grow text-gray-800 dark:bg-gray-600 dark:text-gray-200 rounded-xl border border-solid bg-gray-50 dark:border-gray-500 border-gray-300">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-xl">
            <PulseLoader color="#4b5563" size={10} />
          </div>
        )}
        {story ? (
          story
        ) : (
          <>
            Mia liebte den Wald. Die großen Bäume, die grünen Blätter und die
            bunten Blumen machten sie glücklich. Eines Tages ging Mia mit ihrem
            Hund Max in den Wald. Max war ein kleiner, braver Hund. Er liebte
            es, Stöckchen zu holen. Mia und Max gingen auf einem kleinen Weg.
            Plötzlich sahen sie einen großen, braunen Hasen. Der Hase hoppelte
            schnell davon. „Wow!“,
          </>
        )}
      </div>
    </>
  );
}
