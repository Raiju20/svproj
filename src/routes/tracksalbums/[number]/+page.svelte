<script lang="ts">
    import {page} from '$app/state';
     import type { PageData } from "./$types";
     let { data }: { data: PageData } = $props();
    
 </script>
 
<!-- <h3>
    {JSON.stringify(data.result)}
</h3> -->

 <div style='padding:10px'>
     {#if data && data.result}
         {#each data.result as track}
             <div>{track.name}</div>
         {:else}
             <div>У альбома нет треков</div>
         {/each}
     {/if}
 </div>