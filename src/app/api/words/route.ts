import { processEnv } from '@/app/server/common/processEnv';
import { CreateWordDto } from '@/app/server/modules/words/create-word.dto';
import { createWord } from '@/app/server/modules/words/words.service';
import { parseCookie } from '@/utils/parseCookie';

export async function POST(request: Request) {
  // TODO: implement some other way to authenticate
  try {
    const cookie = parseCookie(request.headers.get('cookie') ?? '');

    if (cookie['session_id'] !== processEnv.NEXT_SERVER_API_KEY) {
      return new Response('Unauthorized', { status: 401 });
    }
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }

  const body = (await request.json()) as CreateWordDto; // TODO: Add validation

  try {
    await createWord({
      word: body.word,
      sentence: body.sentence,
    });
    return new Response(null, { status: 201 });
  } catch {
    return new Response('Internal Server Error', { status: 500 }); // TODO: Add error handling
  }
}
