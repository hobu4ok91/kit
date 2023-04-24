<script lang="ts">
  export let href: string | undefined;
  export let active = false;
</script>

<div
  class="selectable-item"
  class:selectable-item_active={active}
  role="button"
>
  {#if active}
    <div class="selectable-item_border" />
  {/if}
  {#if href}
    <a
      {href}
      class="absolute inset-0 text-transparent {$$restProps.class ?? ''}"
      on:click
    >
      link
    </a>
  {/if}
  <slot />
</div>

<style lang="postcss">
  .selectable-item {
    @apply transition-colors hover:bg-hover cursor-pointer relative;
    scroll-margin-top: 56px;
  }

  .selectable-item_active {
    @apply bg-blue-50 hover:bg-blue-50;
  }

  .selectable-item_border {
    @apply absolute left-0 inset-y-0 w-2 bg-primary;
    z-index: 3002;
  }
</style>
