import { useState } from 'react';

interface CreateWordProps {
  word: string;
  sentence: string;
}

export const useSubmitWords = () => {
  const [createWordsCount, setCreatedWordsCount] = useState<number>(0);

  const createWord = async ({ word, sentence }: CreateWordProps) => {
    const response = await fetch('/api/words', {
      method: 'POST',
      body: JSON.stringify({ word, sentence }),
    });

    if (response.ok) {
      setCreatedWordsCount((prev) => prev + 1);
    } else {
      console.error('Failed to create word');
    }
  };

  const resetCreatedWordsCount = () => {
    setCreatedWordsCount(0);
  };

  return { createWord, createWordsCount, resetCreatedWordsCount };
};
