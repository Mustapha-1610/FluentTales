interface Props {
  verb: {
    word: string;
    translation: string;
    example: string;
  };
}
export default function GeneratedVerbs({ verb }: Props) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className=" capitalize text-xl font-semibold mb-2 dark:text-white">
        {verb.word}
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Translation: <span className="font-medium">{verb.translation}</span>
        <br />
        Example: <span className="italic">{verb.example}</span>
      </p>
    </div>
  );
}
