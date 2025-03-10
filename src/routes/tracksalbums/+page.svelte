<script lang="ts">
    import type { PageData } from "./$types";
    let { data }: { data: PageData } = $props();
</script>

<h1>PARAMS. Количество треков</h1>

<div style="width:500px;margin:auto; max-height: 400px; overflow-y:scroll;">
    {#if data?.result}
        <div style="display:flex;gap:10px">
            <div style="width:350px">Альбом</div>
            <div>Треки</div>
        </div>
        {#each data.result as album}
            <div style="display:flex;gap:10px">
                <div style="width:350px;padding:3px">
                    <a href={`/paramsnum/${album.albumsId}`}>
                        {album.albumsName}
                    </a>
                </div>
                <div style="width:60px;text-align:center;padding:3px">
                    {album.tracksCount}
                </div>
            </div>
        {/each}
    {/if}
</div>