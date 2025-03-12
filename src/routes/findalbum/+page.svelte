<script lang="ts">
    import type { PageProps } from "./$types";
    let { data, form }: PageProps = $props();
</script>

<div class="container">
    <div class="header">
        <i class="fas fa-music icon"></i>
        {data.something}
    </div>

    <h4 class="section-title">
        <i class="fas fa-search"></i> Поиск альбома
    </h4>
    
    <form method="POST" class="search-form">
        <label class="input-group">
            <i class="fas fa-compact-disc form-icon"></i>
            <input 
                name="album" 
                type="text" 
                required
                class="text-input"
                placeholder="Введите название альбома"
                value={form?.data?.album ?? ''}
            />
            {#if form?.errors?.album}
                <div class="error">
                    <i class="fas fa-exclamation-circle"></i> 
                    {form.errors.album.join(", ")}
                </div>
            {/if}
        </label>

        <button class="submit-button">
            <i class="fas fa-search"></i> Найти
        </button>
    </form>

    {#if form?.notfinded}
        <p class="error message">
            <i class="fas fa-times-circle"></i> Ничего не нашлось
        </p>
    {/if}

    {#if form?.finded}
        <div class="results">
            <h3 class="album-title">
                <i class="fas fa-album"></i> {form.finded.title}
            </h3>
            <div class="track-list">
                {#each form.finded.tracks as item}
                    <div class="track-item">
                        <i class="fas fa-music note-icon"></i> {item.name}
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    /* Основные стили */
    .container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background: #f8f9ff;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    /* Иконки */
    .fas {
        margin-right: 8px;
        font-size: 1.1em;
    }

    /* Заголовок */
    .header {
        font-size: 2rem;
        color: #2c3e50;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
    }

    .icon {
        color: #3498db;
        margin-right: 15px;
        font-size: 1.5em;
    }

    /* Форма поиска */
    .search-form {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .text-input {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #e0e7ff;
        border-radius: 6px;
        font-size: 16px;
        transition: all 0.3s ease;
    }

    .text-input:focus {
        border-color: #3498db;
        box-shadow: 0 0 8px rgba(52,152,219,0.2);
    }

    /* Кнопка */
    .submit-button {
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        padding: 12px 25px;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .submit-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(52,152,219,0.3);
    }

    /* Ошибки */
    .error {
        color: #e74c3c;
        font-size: 0.9em;
        margin-top: 8px;
        display: flex;
        align-items: center;
    }

    .message {
        background: #fee2e2;
        padding: 1rem;
        border-radius: 6px;
        margin: 1rem 0;
    }

    /* Результаты */
    .results {
        margin-top: 2rem;
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
    }

    .track-item {
        padding: 12px;
        margin: 8px 0;
        background: #f8f9ff;
        border-radius: 4px;
        display: flex;
        align-items: center;
    }

    .note-icon {
        color: #3498db;
        font-size: 0.8em;
        margin-right: 10px;
    }
</style>

<!-- Добавить в head -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">