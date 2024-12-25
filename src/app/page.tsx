'use client';

import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import SelectedWordViewer from '@/components/SelectedWordViewer';
import Spin from '@/components/Spin';
import Textarea from '@/components/Textarea';
import WordSelector from '@/components/WordSelector';
import { useSetWordState } from '@/hooks/useSetWordState';
import { useSubmitWords } from '@/hooks/useSubmitWords';
import { Sentence } from '@/types/sentence';
import { parseStringToSentence } from '@/utils/parseStringToSentence';
import { useCallback, useEffect, useState } from 'react';

const chunkWordsWithPhraseId = (sentence: Sentence): string[] => {
  const result: string[] = [];

  let isCheckingPhrase = false;

  sentence.forEach((word) => {
    if (word.selected && !word.phraseId) {
      // if selected but not a phrase, append the word to the result
      return result.push(word.value);
    }

    // if started checking phrase, append the word to the last element of the result
    if (isCheckingPhrase) {
      result[result.length - 1] += ` ${word.value}`;

      if (word.phraseId) {
        // last word of the phrase
        isCheckingPhrase = false;
      }

      return;
    }

    // first word of the phrase
    if (word.phraseId) {
      isCheckingPhrase = true;
      return result.push(word.value);
    }
  });

  return result;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useSetWordState();

  const sentence = state.sentence;
  const isPhraseSelectionMode = sentence.some(
    (word) => word.isOpenForPhraseSelectionMode,
  );

  const { createWord, createWordsCount, resetCreatedWordsCount } =
    useSubmitWords();

  const selectedWords = chunkWordsWithPhraseId(sentence);

  const isSubmitDisabled = selectedWords.length === 0;

  const handleChangeSentence = useCallback(
    (value: string) => {
      const words = parseStringToSentence(value);

      dispatch({ type: 'SET_SENTENCE', sentence: words, rawSentence: value });
    },
    [dispatch],
  );

  const handleSelectWord = (selectedWord: Sentence[number]) => {
    // if already selected, enter phrase selection mode

    if (isPhraseSelectionMode) {
      // if tapped on the same word
      if (selectedWord.isOpenForPhraseSelectionMode) {
        return dispatch({
          type: 'MARK_WORD_AS_DEFAULT_STATE',
          wordId: selectedWord.id,
        });
      }

      // if tapped on a different word
      return dispatch({
        type: 'SET_PHRASE',
        word1: selectedWord,
        word2: sentence.find((word) => word.isOpenForPhraseSelectionMode)!, // TODO: Fix this non-null assertion
      });
    }

    if (selectedWord.selected) {
      return dispatch({
        type: 'MARK_WORD_AS_OPEN_FOR_PHRASE_SELECTION',
        wordId: selectedWord.id,
      });
    }

    return dispatch({ type: 'MARK_WORD_AS_SELECTED', wordId: selectedWord.id });

    // const wordOpenForSelection = sentence.find(
    //   (word) => word.isOpenForPhraseSelectionMode,
    // );
    // if (isPhraseSelectionMode) {
    //   if (!wordOpenForSelection) {
    //     return;
    //   }

    //   const phraseId = new Date().getTime().toString(); // TODO: implement more reliable id generation

    //   // select all words between the selected word and the word that is open for phrase selection (inclusive), and assign the same phraseId
    //   const selectedWordIndex = sentence.findIndex(
    //     (word) => word.id === selectedWord.id,
    //   );

    //   const wordOpenForSelectionIndex = sentence.findIndex(
    //     (word) => word.id === wordOpenForSelection.id,
    //   );

    //   const startIndex = Math.min(selectedWordIndex, wordOpenForSelectionIndex);
    //   const endIndex = Math.max(selectedWordIndex, wordOpenForSelectionIndex);

    //   setSentence((prev) =>
    //     prev.map((word, index) =>
    //       index >= startIndex && index <= endIndex
    //         ? { ...word, selected: true, phraseId }
    //         : word,
    //     ),
    //   );

    //   // reset phrase selection mode
    //   setSentence((prev) =>
    //     prev.map((word) =>
    //       word.isOpenForPhraseSelectionMode
    //         ? { ...word, isOpenForPhraseSelectionMode: false }
    //         : word,
    //     ),
    //   );

    //   return;
    // }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    Promise.all(
      selectedWords.map((word) =>
        createWord({ word, sentence: state.rawSentence }),
      ),
    )
      .then(() => {
        resetCreatedWordsCount();
        dispatch({ type: 'RESET_SENTENCE' });
      })
      .catch(() => {
        alert('Failed to create word');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // whenever window is focused, paste from clipboard the sentence.
    const pasteFromCilpboard = () => {
      try {
        navigator.clipboard.readText().then((text) => {
          handleChangeSentence(text);
        });
      } catch {
        // no-op
      }
    };

    // initally paste from clipboard
    pasteFromCilpboard();

    window.addEventListener('focus', pasteFromCilpboard);

    return () => {
      window.removeEventListener('focus', pasteFromCilpboard);
    };
  }, [handleChangeSentence]);

  return (
    <main className="flex flex-col">
      {/* <div className="h-5" /> */}
      {/* <h1 className="text-4xl font-bold text-center">Register Words</h1> */}
      <div className="h-10" />
      <Textarea
        value={sentence.map((word) => word.value).join(' ')}
        onChange={handleChangeSentence}
        placeholder="Type a sentence..."
      />
      <WordSelector sentence={sentence} onSelectWord={handleSelectWord} />
      <div className="h-10" />
      <SelectedWordViewer words={selectedWords} />
      <div className="h-10" />
      <Button
        isLoading={isLoading}
        onClick={handleSubmit}
        disabled={isSubmitDisabled || isLoading}
        className={`
          fixed bottom-4 left-0 right-0 font-bold text-xl p-4
          `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spin />
          </div>
        ) : isSubmitDisabled ? (
          'Select words to submit'
        ) : (
          'Submit'
        )}
      </Button>
      {createWordsCount > 0 && (
        <ProgressBar
          totalCount={selectedWords.length}
          completedCount={createWordsCount}
        />
      )}
      <div className="h-20" />
    </main>
  );
}
