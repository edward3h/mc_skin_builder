<script lang="ts">
    import { onMount } from 'svelte';
    import { loadScript } from '$lib/loader';

    export let imageData;
    let skinRender;

    $: if (imageData) {
        doUpdate({data: imageData});
    } else {
        doUpdate({url: '/parts/base/Naked_set.png'});
    }

    function doUpdate(imageTexture) {
        if (skinRender) {
            skinRender.clearScene();
            skinRender.render(imageTexture);
        }
    }

    onMount(async () => {
        await Promise.all(
            [
                // workaround since minerender is not published as a module
            loadScript('https://cdn.jsdelivr.net/gh/InventivetalentDev/MineRender@1.4.6/dist/skin.min.js'),
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'),
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/94/three.min.js')
        ]
            );
        let element = document.getElementById('render');
        console.log('element', element);
        skinRender = new SkinRender({
            canvas: {
            width: element?.offsetWidth, 
            height: Math.max(element?.offsetHeight, element?.offsetWidth * 1.5)}, 
            controls:{zoom:false, pan:false}}, element);
        skinRender.render({url: '/parts/base/Naked_set.png'});
    });
</script>

<div id="render">

</div>

<style>
    #render {
        width: 40%;
        /* background-color: white; */
    }
    /* :global(#render canvas) {
        filter: drop-shadow(5px 5px 5px #222);
    } */
</style>