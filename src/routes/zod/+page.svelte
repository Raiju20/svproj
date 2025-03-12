<script lang="ts">
    import type { PageData, ActionData } from "./$types"; //Вар-т 2
    import type { PageProps } from "./$types"; //Вар-т 1

    let { data, form }: { data: PageData; form: ActionData } = $props(); //Вар-т 2
    // let { data, form }: PageProps = $props(); //Вар-т 1
</script>

<form method="POST">
    <div>
        <input type="text" name="name" placeholder="Name" />
        {#if form?.errors?.name}
            <div class="error">{form.errors.name.join(", ")}</div>
        {/if}
    </div>
    <div>
        <select name="prof" aria-label="Prof" required>
            <option value="buhgalter">Бухгалтер</option>
            <option value="engineer">Инженер</option>
            <option value="manager">Менеджер</option>
            <option value="director">Директор</option>
        </select>
    </div>
    <div>
        <input type="email" name="email" placeholder="Email" />
        {#if form?.errors?.email}
            <div class="error">{form.errors.email.join(", ")}</div>
        {/if}
    </div>

    <button type="submit">Submit</button>
</form>

{#if form?.success}
    <div class="success">Данные успешно отправлены!</div>
{/if}