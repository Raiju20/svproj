<script lang="ts">
    import type { PageData } from "./$types";
    //let { data } = $props();
    let {data}:{data:PageData} = $props()
</script>

<h3>
    {JSON.stringify(data.result)}
</h3>
{#if data && data.result}
    {#each data.result as artist}
        <h3>{artist.name}</h3>
        {#each artist.albums as album}
            <p style='margin-left: 20px;'>{album.title}</p>
        {/each}
    {/each}
{/if}