<svelte:options runes={true} />
<script lang='ts'>
    import type {PageProps} from "./$types";
    let { data }: PageProps = $props();
</script>

{JSON.stringify(data)}
<h3>
    {#if data && data.result}
        {#each data.result as item}
            <div>{item.artistId}--{item.name}</div>
        {/each}
    {:else}
        <div>Данных нет</div>
    {/if}
</h3>