import Word from '@/components/Word';
import { Sentence } from '@/types/sentence';

interface Props {
  sentence: Sentence;
  onSelectWord: (word: Sentence[number]) => void;
}

const WordSelector = ({ sentence, onSelectWord }: Props) => {
  return (
    <div>
      {sentence.map((word) => (
        <Word key={word.id} word={word} onSelectWord={onSelectWord} />
      ))}
    </div>
  );
};

export default WordSelector;
