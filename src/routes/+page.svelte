<script lang="ts">
	import { composeImage } from "$lib/image";
	import type { PageData } from "./$types";
	import type { Item } from "./+page.server";
	import DisplayItem from "./DisplayItem.svelte";
	import RenderSkin from "./RenderSkin.svelte";
    import {browser} from '$app/environment';

    export let data: PageData;
    let selectedItems: Record<string, string> = {};
    let imageData:string;
    $: if (browser) {
        composeImage(selectedItems)
        .then(b64 => {imageData = b64});
    }

    function handleClick(item:Item) {
        if (item.src === selectedItems[item.part]) {
            selectedItems[item.part] = '';
        } else {
            selectedItems[item.part] = item.src;
        }
    }
</script>

<h1>Costume Chooser</h1>
<div class="content">
<div class="items">
{#each data.items as item}
    {#if item.part != 'base'}
        <DisplayItem item={item} selected={item.src === selectedItems[item.part]} on:click={e => handleClick(item)}/>
    {/if}
{/each}
</div>
<RenderSkin {imageData}/>
</div>

<!-- {#if imageData}
<img src={imageData} alt="debug" width="33%">
{/if} -->

<style>
    :global(body) {
        background-color: #333;
        color: antiquewhite;
        image-rendering: pixelated;
    }
    .items {
        display: grid;
        grid-template-columns: repeat(5, max-content);
        grid-auto-rows: max-content;
        justify-content: start;
        gap: 0.5rem;
    }
    .content {
        display: flex;
        gap: 0.5rem;
    }
</style>