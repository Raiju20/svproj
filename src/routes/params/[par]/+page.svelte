<script lang="ts">
    import {page} from '$app/state';
     import type { PageData } from "./$types";
     let { data }: { data: PageData } = $props();
 
 </script>
 
 <div style='padding:10px'>
     {#if data && data.result}
         {#each data.result as album}
             <div>{album.title}</div>
         {:else}
             <p>Исполнитель не имеет альбомов.</p>
         {/each}
     {/if}
 </div>