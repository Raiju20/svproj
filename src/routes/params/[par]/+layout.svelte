<script lang="ts">
    import type { Snippet } from "svelte";
    import type { LayoutData } from "./$types";

    let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>


<div style="display:flex">
    <div>
        {#if data?.result}
            {#each data.result as artist}
                <div>
                    <a href={`/params/${artist.artistId}`}>
                        {artist.artistName}
                    </a>
                </div>
            {/each}
        {/if}
<a href='/params/'>Params</a>
    </div>
    <div style="width:50%;margin-left:20px;background: #dedede;">
        {@render children()}
   </div>
</div>