<script lang="ts">
  import SelectableItem from "./SelectableItem.svelte";
  import Image from "./Image.svelte";

  export let image: string | undefined = undefined;
  export let href: string | undefined = undefined;
  export let active = false;
</script>

<SelectableItem {href} {active} class={$$restProps.class} on:click>
  <div class="list-item">
    {#if image}
      <div class="h-12 w-12 mr-4 flex items-center">
        <Image src={image} class="mix-blend-multiply" />
      </div>
    {/if}
    <div class="truncate max-w-full w-full">
      <slot {active} />
    </div>
  </div>
</SelectableItem>

<style lang="postcss">
  .list-item {
    @apply flex items-center py-2 px-4 lg:px-7;
  }
</style>
