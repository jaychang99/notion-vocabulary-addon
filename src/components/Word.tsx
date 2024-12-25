import { KEYWORD_LENGTH_THRESHOLD } from '@/constants/config';
import { Sentence } from '@/types/sentence';

interface Props {
  word: Sentence[number];
  onSelectWord: (word: Sentence[number]) => void;
}

const Word = ({ word, onSelectWord }: Props) => {
  const wordLength = word.value.length;
  const shouldDim = wordLength < KEYWORD_LENGTH_THRESHOLD;

  return (
    <button
      className={`p-2 m-1 border-2 ${
        shouldDim ? 'text-gray-500' : 'text-gray-100'
      } rounded-md ${
        word.selected && !word.isOpenForPhraseSelectionMode
          ? 'bg-white text-gray-900'
          : ''
      }
      ${shouldDim ? 'border-gray-500' : ''}
      ${word.isOpenForPhraseSelectionMode ? 'bg-green-500 text-white' : ''}
      ${
        word.phraseId
          ? 'border-dashed border-2 border-gray-700'
          : 'border-solid border-2'
      }
      `}
      onClick={() => onSelectWord(word)}
    >
      {word.value}
    </button>
  );
};

export default Word;
