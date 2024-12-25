import Word from '@/components/Word';
import { Sentence } from '@/types/sentence';

interface Props {
  sentence: Sentence;
  onSelectWord: (word: Sentence[number]) => void;
}

type SentenceWithPhraseInfo = Sentence[number] & {
  isPartOfPhrase: boolean;
};

const getSentencesWithPhraseInfo = (sentence: Sentence) => {
  const result: SentenceWithPhraseInfo[] = [];

  let isCheckingPhrase = false;

  sentence.forEach((word) => {
    if (word.selected && !word.phraseId) {
      // if selected but not a phrase, append the word to the result
      return result.push({ ...word, isPartOfPhrase: false });
    }

    // if started checking phrase, append the word to the last element of the result
    if (isCheckingPhrase) {
      result.push({ ...word, isPartOfPhrase: true });

      if (word.phraseId) {
        // last word of the phrase
        isCheckingPhrase = false;
      }

      return;
    }

    // first word of the phrase
    if (word.phraseId) {
      isCheckingPhrase = true;
      return result.push({ ...word, isPartOfPhrase: true });
    }

    result.push({ ...word, isPartOfPhrase: false });
  });

  return result;
};

const WordSelector = ({ sentence, onSelectWord }: Props) => {
  const sentenceWithPhraseInfo = getSentencesWithPhraseInfo(sentence);

  return (
    <div>
      {sentenceWithPhraseInfo.map((word) => (
        <Word
          key={word.id}
          word={word}
          onSelectWord={onSelectWord}
          isPartOfPhrase={word.isPartOfPhrase}
        />
      ))}
    </div>
  );
};

export default WordSelector;
