import { CreateWordDto } from '@/app/server/modules/words/create-word.dto';
import { createWord } from '@/app/server/modules/words/words.service';

export async function POST(request: Request) {
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
