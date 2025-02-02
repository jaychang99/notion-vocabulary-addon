import { Sentence } from '@/types/sentence';

export const parseStringToSentence = (value: string): Sentence => {
  const parseValue = pipe(removePunctuation, replaceNewlineCharactersWithSpace);

  const parsedValue = parseValue(value);

  return parsedValue.split(' ').map((word, index) => ({
    id: `${word}-${index}`, // This is a temporary solution to avoid using the same id for different words
    value: word,
    selected: false,
  }));
};

type Transformer = (value: string) => string;

const pipe =
  (...fns: Transformer[]) =>
  (value: string) =>
    fns.reduce((acc, fn) => fn(acc), value);

const removePunctuation = (value: string) =>
  // remove all punctuation except for hyphen
  value.replace(/[.,\/#!$%^&*;:=_'"`~()\[\]{}<>“”‘’—–…]/g, '');

const replaceNewlineCharactersWithSpace = (value: string) =>
  value.replace(/\n/g, ' ');
