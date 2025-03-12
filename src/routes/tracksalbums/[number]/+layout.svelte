<script lang="ts">
    import type { Snippet } from "svelte";
    import type { LayoutData } from "./$types";

    let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>


<div style="display:flex">
    <div>
        {#if data?.result}
            {#each data.result as track}
                <div>
                    <a href={`/tracksalbums/${track.albumsId}`}>
                        {track.albumsName}
                    </a>
                </div>
            {/each}
        {/if}
<a href='/tracksalbums/'>ParamsNumber</a>
    </div>
    <div style="width:50%;margin-left:20px;background: #dedede;">
        {@render children()}
   </div>
</div>