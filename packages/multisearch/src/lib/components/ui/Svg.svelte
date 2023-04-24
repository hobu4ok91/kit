<script lang="ts">
  export let icon: string;

  $: [d, viewBox] = icon.split("|");
</script>

<svg {viewBox} class={$$restProps.class}>
  <path {d} />
</svg>

<style lang="postcss">
  svg {
    @apply w-6 h-6 fill-current flex-shrink-0;
  }
</style>
