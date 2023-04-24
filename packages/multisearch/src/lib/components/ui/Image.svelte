<script lang="ts">
  import { onMount } from "svelte";

  export let src = "";
  export let alt = "";

  let loaded = false;
  let thisImage: HTMLImageElement;

  onMount(() => {
    if (thisImage.complete) {
      loaded = true;
    }
  });

  function load() {
    loaded = true;
  }
</script>

<img
  {src}
  {alt}
  on:load={load}
  bind:this={thisImage}
  class="s-image {loaded ? 'opacity-100' : 'opacity-0'} {$$restProps.class ??
    ''}"
/>

<style lang="postcss">
  .s-image {
    @apply transition-opacity duration-200 max-w-full max-h-full;
  }
</style>
