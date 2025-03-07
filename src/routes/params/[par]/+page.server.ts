import type { PageServerLoad } from './$types';
import { db, albums } from '$lib/server/db';
import type { Album } from '$lib/server/schema';
import { eq, asc, desc } from 'drizzle-orm';

export const load = (async ({ params }) => {
    console.log('page.server.ts', params.par)
    try {
        const result: Album[] = await db.select()
            .from(albums)
            .orderBy(asc(albums.title))
            .where(eq(albums.artistId, parseInt(params.par)))

        return { result };
    } catch (error) {
        console.log(error)
    }


    return { v: params.par };
}) satisfies PageServerLoad;