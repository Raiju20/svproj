<script lang="ts">
    import { writable } from 'svelte/store';
    import type { PageData } from "./$types";
    let { data }: { data: PageData } = $props();
    
    // Инициализируем выбранного исполнителя с помощью writable
    const selectedArtistId = writable(data.result?.[0]?.artistId); // выбираем первого исполнителя по умолчанию
</script>

<div class="container">
    <div class="left-column">
        <h3>Исполнители</h3>
        {#if data.result && data.result.length > 0} <!-- Проверка на наличие данных -->
            {#each data.result as artist}
                <button
                    class:selected={artist.artistId === $selectedArtistId}
                    onclick={() => {
                        console.log(`Artist clicked: ${artist.name}`); // Отладка
                        selectedArtistId.set(artist.artistId); // Обновляем выбранного исполнителя
                    }}
                >
                    {artist.name}
                </button>
            {/each}
        {:else}
            <p>Нет исполнителей для отображения.</p> <!-- Сообщение, если данных нет -->
        {/if}
    </div>

    <div class="right-column">
        <h3>Альбомы</h3>
        {#if $selectedArtistId}
            {#each data.result.find(a => a.artistId === $selectedArtistId)?.albums as album}
                <div class="album">{album.title}</div>
            {/each}
        {:else}
            <p>Выберите исполнителя, чтобы увидеть альбомы.</p>
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        gap: 2rem;
        padding: 1rem;
    }

    .left-column {
        width: 250px;
        border-right: 1px solid #ccc;
        padding-right: 1rem;
    }

    .right-column {
        flex: 1;
    }

    button {
        display: block;
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        text-align: left;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 4px;
    }

    button:hover {
        background: #f0f0f0;
    }

    button.selected {
        background: #e0e0ff;
        font-weight: bold;
    }

    .album {
        padding: 0.5rem;
        margin-bottom: 0.25rem;
        background: #f8f8f8;
        border-radius: 4px;
    }
</style>
