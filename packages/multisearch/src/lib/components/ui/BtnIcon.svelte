<script lang="ts">
  import Svg from "./Svg.svelte";

  export let icon: string;
  export let type: "submit" | "button" = "button";

  function typeAction(node: HTMLButtonElement) {
    node.type = type;
  }
</script>

<button on:click class="btn-icon" use:typeAction>
  <Svg {icon} />
</button>

<style lang="postcss">
  .btn-icon {
    @apply p-2 flex-shrink-0 rounded-full w-10 h-10 border-none m-0 appearance-none bg-transparent hover:bg-gray-100 transition-colors cursor-pointer;
  }
</style>
