export const removePartsOfInput = (value: string): string => {
  const parseValue = pipe(
    removeAmazonKindleSourceText,
    removeApplePodcastSourceText,
    truncateTrailingNewlines,
  );

  const parsedValue = parseValue(value);

  return parsedValue;
};

type Transformer = (value: string) => string;

const pipe =
  (...fns: Transformer[]) =>
  (value: string) =>
    fns.reduce((acc, fn) => fn(acc), value);

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

const truncateTrailingNewlines = (value: string) => value.trim();
