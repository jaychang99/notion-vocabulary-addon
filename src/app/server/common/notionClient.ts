import { processEnv } from '@/app/server/common/processEnv';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Client } = require('@notionhq/client');

// Initializing a client
export const notionClient = new Client({
  auth: processEnv.NOTION_TOKEN,
});
