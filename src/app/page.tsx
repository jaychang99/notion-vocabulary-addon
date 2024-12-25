'use client';

import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import SelectedWordViewer from '@/components/SelectedWordViewer';
import Textarea from '@/components/Textarea';
import WordSelector from '@/components/WordSelector';
import { useSubmitWords } from '@/hooks/useSubmitWords';
import { Sentence } from '@/types/sentence';
import { parseStringToSentence } from '@/utils/parseStringToSentence';
import { useEffect, useState } from 'react';

export default function Home() {
  const [sentence, setSentence] = useState<Sentence>([]);

  const { createWord, createWordsCount, resetCreatedWordsCount } =
    useSubmitWords();

  const selectedWords = sentence
    .filter((word) => word.selected)
    .map((word) => word.value);

  const isSubmitDisabled = selectedWords.length === 0;

  const handleChangeSentence = (value: string) => {
    const words = parseStringToSentence(value);

    setSentence(words);
  };

  const handleSelectWord = (id: string) => {
    setSentence((prev) =>
      prev.map((word) =>
        word.id === id ? { ...word, selected: !word.selected } : word,
      ),
    );
  };

  const handleSubmit = () => {
    const selectedWords = sentence
      .filter((word) => word.selected)
      .map((word) => word.value);

    const stringifiedSentence = sentence.map((word) => word.value).join(' ');

    Promise.allSettled(
      selectedWords.map((word) =>
        createWord({ word, sentence: stringifiedSentence }),
      ),
    ).then(() => {
      resetCreatedWordsCount();
      setSentence([]);
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
  }, []);

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
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        className={`
          fixed bottom-4 left-0 right-0 font-bold text-xl p-4
          `}
      >
        {isSubmitDisabled ? 'Select words to submit' : 'Submit'}
      </Button>
      {/* {createWordsCount > 0 && (
        <ProgressBar
          totalCount={selectedWords.length}
          completedCount={createWordsCount}
        />
      )} */}
      <ProgressBar totalCount={5} completedCount={3} />
      <div className="h-20" />
    </main>
  );
}
