import { Sentence } from '@/types/sentence';

interface Props {
  word: Sentence[number];
  onSelectWord: (id: number) => void;
}

const Word = ({ word, onSelectWord }: Props) => {
  return (
    <button
      className={`p-2 m-1 border-2 border-gray-300 rounded-md ${
        word.selected ? 'bg-blue-800' : ''
      }`}
      onClick={() => onSelectWord(word.id)}
    >
      {word.value}
    </button>
  );
};

export default Word;
