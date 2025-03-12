import type { PageServerLoad } from './$types';
import { db, albums, tracks } from '$lib/server/db';
import type { Track } from '$lib/server/schema';
import { eq, asc, desc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { SQLiteSyncDialect } from 'drizzle-orm/sqlite-core';

export const load = (async ({ params }) => {
    console.log('page.server.ts', params.number)
    try {
        const query = db.select()
            .from(tracks)
            .orderBy(asc(tracks.name))
            .where(eq(tracks.albumId, parseInt(params.number)));
            
        // Получаем сформированный SQL запрос перед выполнением
        const sqliteDialect = new SQLiteSyncDialect();
        const sqlQuery = sql`select * from ${tracks} where ${tracks.albumId} = ${parseInt(params.number)}`;
        const { sql: sqlString, params: sqlParams } = sqliteDialect.sqlToQuery(sqlQuery);
        console.log('SQL Query:', sqlString);
        console.log('Parameters:', sqlParams);

        // Выполняем оригинальный запрос
        const result: Track[] = await query;
        return { result };
    } catch (error) {
        console.log(error)
    }
}) satisfies PageServerLoad;