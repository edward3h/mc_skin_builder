<script lang="ts">
	import type { Item } from "./+page.server";
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    export let item:Item;
    export let selected = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="item" class:selected on:click on:keypress>
    <img src={item.src} alt={item.display}>
    <div>{item.display}</div>
</div>

<style>
    .item {
        background-color: black;
        padding: 0.5rem;
        border: thin grey solid;
        cursor: pointer;
    }
    .item.selected {
        border: thick yellow solid;
    }
</style>