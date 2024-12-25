'use client';

import Button from '@/components/Button';
import SelectedWordViewer from '@/components/SelectedWordViewer';
import Textarea from '@/components/Textarea';
import WordSelector from '@/components/WordSelector';
import { Sentence } from '@/types/sentence';
import { useState } from 'react';

export default function Home() {
  const [sentence, setSentence] = useState<Sentence>([]);

  const selectedWords = sentence
    .filter((word) => word.selected)
    .map((word) => word.value);

  const handleChangeSentence = (value: string) => {
    const words = value.split(' ').map((word, index) => ({
      id: index,
      value: word,
      selected: false,
    }));

    setSentence(words);
  };

  const handleSelectWord = (id: number) => {
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

    console.log(selectedWords);
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <Textarea
        onChange={handleChangeSentence}
        placeholder="Type a sentence..."
      />
      <WordSelector sentence={sentence} onSelectWord={handleSelectWord} />
      <div className="h-10" />
      <SelectedWordViewer words={selectedWords} />
      <div className="h-10" />
      <Button onClick={handleSubmit} disabled={selectedWords.length === 0}>
        Submit
      </Button>
    </main>
  );
}
