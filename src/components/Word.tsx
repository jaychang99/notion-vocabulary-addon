import { KEYWORD_LENGTH_THRESHOLD } from '@/constants/config';
import { Sentence } from '@/types/sentence';

interface Props {
  word: Sentence[number];
  onSelectWord: (id: string) => void;
}

const Word = ({ word, onSelectWord }: Props) => {
  const wordLength = word.value.length;
  const shouldDim = wordLength < KEYWORD_LENGTH_THRESHOLD;

  return (
    <button
      className={`p-2 m-1 border-2 ${
        shouldDim ? 'text-gray-500' : 'text-gray-100'
      } rounded-md ${word.selected ? 'bg-white text-gray-900' : ''}
      ${shouldDim ? 'border-gray-500' : ''}
      `}
      onClick={() => onSelectWord(word.id)}
    >
      {word.value}
    </button>
  );
};

export default Word;
