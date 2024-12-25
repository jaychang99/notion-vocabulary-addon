interface Props {
  words: string[];
}

const SelectedWordViewer = ({ words }: Props) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Selected Words</h2>
      <ul className="flex flex-wrap">
        {words.map((word, index) => (
          <li
            key={index}
            className="p-2 m-1 border-gray-300 rounded-md bg-blue-800 text-white
          "
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedWordViewer;
