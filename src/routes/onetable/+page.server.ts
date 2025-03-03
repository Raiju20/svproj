import type { PageServerLoad } from './$types'
import { db, artists } from '$lib/server/db';
import type { Question } from '$lib/server/schema';

//simpleArtist
export const load = (async (): Promise<{ result: Question [] }> => {
  try {
    const result = await db.select()
      .from(artists)
      .limit(5)
    console.log(result)
    return { result };
  } catch (error) {
    console.error(error);
    return { result: [] };
  }

}) satisfies PageServerLoad;