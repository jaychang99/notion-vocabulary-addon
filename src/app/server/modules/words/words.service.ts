import { notionClient } from '@/app/server/common/notionClient';
import { processEnv } from '@/app/server/common/processEnv';
import { CreateWordDto } from '@/app/server/modules/words/create-word.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends CreateWordDto {}

export async function createWord({ word, sentence }: Props) {
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
              content: sentence,
            },
          },
        ],
      },
    },
  });
}
