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
  // remove  `— {something} https://a.co${something}`

  // if value contains 'Kindle Edition' remove the whole line containing 'Kindle Edition'
  if (value.includes('Kindle Edition')) {
    return value.replace(/.*Kindle Edition./, '');
  }

  return value.replace(/—[\s\S]*?a\.co[\s\S]*?$/, '');
};

const truncateTrailingNewlines = (value: string) => value.trim();
