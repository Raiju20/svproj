import type { PageServerLoad } from './$types';
//import type { Artist } from "$lib/interfaces/artist";
import { db, artists, albums } from '$lib/server/db'
import { eq, asc, desc, } from 'drizzle-orm';

import type { ArtWithAlbums } from '$lib/server/schema';

export const load: PageServerLoad = (async () => {
    try {
        const query = await db.select(
            {
                artId: artists.artistId,
                artName: artists.name,
                albumId: albums.albumId,
                artistId: albums.artistId,
                title: albums.title
            })
            .from(artists)
            .innerJoin(albums, eq(artists.artistId, albums.artistId))
            .orderBy(asc(artists.name))
            //.limit(10)

        // создаем структуру Исполнитель-Альбомы
        const result = query.reduce((acc, row) => {
            //generic вар-т: query.reduce<ArtWithAlbums[]>(...)
            let artist = acc.find(a => a.name === row.artName);
            if (!artist) {
                artist = {
                    artistId: row.artId,
                    name: row.artName,
                    albums: [] //as Album[] <-- Оба вар-та работают
                };
                // добавим исполнителя; список альбомов пуст
                acc.push(artist);
            }
            // добавим альбом к исполнителю
            artist.albums.push({
                albumId: row.albumId,
                artistId: row.artistId,
                title: row.title
            });
            return acc;
        }, [] as ArtWithAlbums[]);

        return { result };
    } catch (error) {
        console.error(error);
        return { error }
    }

});