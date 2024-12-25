import { Sentence } from '@/types/sentence';

export const parseStringToSentence = (value: string): Sentence => {
  return value.split(' ').map((word, index) => ({
    id: `${word}-${index}`, // This is a temporary solution to avoid using the same id for different words
    value: word,
    selected: false,
  }));
};