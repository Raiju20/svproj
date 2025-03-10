import type { PageServerLoad } from './$types';
import { db, tracks } from '$lib/server/db';
import type { Track } from '$lib/server/schema';
import { eq, asc, desc } from 'drizzle-orm';

export const load = (async ({ paramsnum }) => {
    console.log('page.server.ts', paramsnum.number)
    try {
        const result: Track[] = await db.select()
            .from(tracks)
            .orderBy(asc(tracks.name))
            .where(eq(tracks.trackId, parseInt(paramsnum.number)))

        return { result };
    } catch (error) {
        console.log(error)
    }


    return { v: paramsnum.number };
}) satisfies PageServerLoad;