import type { LayoutServerLoad } from './$types';
import { db, albums, tracks } from '$lib/server/db';
import { eq,count } from 'drizzle-orm';

export const load:LayoutServerLoad = (async () => {
    try {
        console.log('+layout.server.ts')

        const result = await db
          .select({
            albumsName: albums.title,
            albumsId: albums.albumId,
            tracksCount: count(tracks.trackId)
          })
          .from(albums)
          .leftJoin(tracks, eq(albums.albumId, tracks.albumId))
          .groupBy(albums.title);

        return { result };
    } catch (error) {
        console.log(error)
    }
});