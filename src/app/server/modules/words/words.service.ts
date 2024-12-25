import { notionClient } from '@/app/server/common/notionClient';
import { processEnv } from '@/app/server/common/processEnv';
import { CreateWordDto } from '@/app/server/modules/words/create-word.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends CreateWordDto {}

export async function createWord({ word, sentence }: Props) {
  // find the word in the sentence and break apart the sentence into three parts
  const wordIndex = sentence.indexOf(word);
  const partBeforeWord = sentence.slice(0, wordIndex);
  const partAfterWord = sentence.slice(wordIndex + word.length);

  return await notionClient.pages.create({
    parent: {
      type: 'database_id',
      database_id: processEnv.NOTION_WORDBOOK_DB_ID,
    },
    properties: {
      Word: {
        title: [
          {
            text: {
              content: word,
            },
          },
        ],
      },
      Sentence: {
        rich_text: [
          {
            text: {
              content: partBeforeWord,
            },
          },
          {
            text: {
              content: word,
            },
            annotations: {
              bold: true,
              underline: true,
            },
          },
          {
            text: {
              content: partAfterWord,
            },
          },
        ],
      },
    },
  });
}
