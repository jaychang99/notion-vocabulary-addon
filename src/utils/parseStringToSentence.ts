import { Sentence } from '@/types/sentence';

export const parseStringToSentence = (value: string): Sentence => {
  // const punctuationRemovedSentence = value.replace(
  //   /[.,\/#!$%\^&\*;:='"\`~]/g,
  //   '',
  // );

  const parseValue = pipe(
    removeAmazonKindleSourceText,
    removeApplePodcastSourceText,
    truncateTrailingNewline,
    removePunctuation,
  );

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
  value.replace(/[.,\/#!$%\^&\*;:='"\`~]/g, '');

const truncateTrailingNewline = (value: string) => value.replace(/\n$/, '');

// remove copyright text automatically added by Apple Podcast
const removeApplePodcastSourceText = (value: string) => {
  // remove phrase that starts with From and ends with This material may be protected by copyright.

  return value.replace(
    /From[\s\S]*?This material may be protected by copyright\.\s*/,
    '',
  );
};

const removeAmazonKindleSourceText = (value: string) => {
  // remove from `—   : ` to the end of the string

  return value.replace(/— .*?: .*$/, '');
};
