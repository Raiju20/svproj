import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const profSchema = z.object({
    name: z.string().trim().min(1,'Укажите имя'),
    prof: z.enum(['buhgalter', 'engineer', 'manager', 'director']),
    email: z.string().email("Некорректный email")
});

export const actions: Actions = {
    default: async ({ request }) => {
        const formdata = await request.formData();
        //проебразуем formdata в обычный объект
        const data = Object.fromEntries(formdata.entries())
        //валидизируем
        const result = profSchema.safeParse(data);

        if (!result.success) {
            // Обрабатываем ошибки валидации
            const errors = result.error.flatten();
            return fail(400, {
                data: data,
                errors: errors.fieldErrors
            });
        }

        // Если валидация успешна - работаем с данными
        console.log('Данные:', result.data);
        return { success: true };
    }
};

export const load = (async () => {
    return { something: 9999 };;
}) satisfies PageServerLoad;