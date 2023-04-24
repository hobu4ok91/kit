<script lang="ts">
  export let title: string | undefined = undefined;
</script>

<div>
  {#if title}
    <div class="list-title-wrap">
      <div class="list-separator" />
      <div class="list-title">
        {title}
      </div>
    </div>
  {/if}
  <slot />
</div>

<style lang="postcss">
  .list-title-wrap {
    @apply text-positive px-4 lg:px-7 mb-4 relative flex;
  }

  .list-separator {
    @apply inset-x-0 ml-4 lg:ml-7 absolute top-1/2 transform -translate-y-1/2 bg-gray-200;
    height: 1px;
  }

  .list-title {
    @apply bg-white relative pr-4 text-overline font-normal;
  }
</style>
