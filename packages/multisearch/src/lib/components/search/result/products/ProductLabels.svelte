<script lang="ts">
  import type { ProductLabel } from "src/lib/types/product";
  import ProductLabelsItem from "./ProductLabelsItem.svelte";
  import { settings } from "~/lib/core/settings";

  export let labels: ProductLabel[];
</script>

<div class="product-labels">
  {#each labels as label}
    <ProductLabelsItem {label} baseUrl={settings.apiUrl} />
  {/each}
</div>

<style lang="postcss">
  .product-labels {
    @apply flex lg:grid lg:gap-y-1 lg:inset-0 lg:place-content-start lg:absolute pointer-events-none;
  }
</style>
