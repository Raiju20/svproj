import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { db, albums, tracks } from '$lib/server/db'
import type { Album, Track } from '$lib/server/schema';
import { eq, like } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { z } from "zod";

export const load = (async (event) => {
    return { something: 3.14 };
}) satisfies PageServerLoad;

const albumSchema = z.object({
    album: z.string().trim().min(3, 'Минимум 3 символа')
});

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        
        // Валидация данных
        const result = albumSchema.safeParse(data);
        
        if (!result.success) {
            const errors = result.error.flatten();
            return fail(400, {
                data: { album: data.album },
                errors: errors.fieldErrors,
                notfinded: false
            });
        }
        
        // Поиск альбома если валидация успешна
        const albTitle = result.data.album;
        const albFinded: Album[] = await db.select()
            .from(albums)
            .where(like(albums.title, `%${albTitle}%`))
            .limit(1);

        if (albFinded.length === 0) {
            return fail(404, { 
                data: { album: albTitle },
                errors: null,
                notfinded: true 
            });
        }

        const albTracks: Track[] = await db.select()
            .from(tracks)
            .where(eq(tracks.albumId, albFinded[0].albumId));
        
        const finded = { ...albFinded[0], tracks: albTracks };

        return { 
            finded, 
            success: true,
            data: { album: albTitle },
            errors: null,
            notfinded: false
        };
    }
} satisfies Actions;