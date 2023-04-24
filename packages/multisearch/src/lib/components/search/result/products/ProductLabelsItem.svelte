<script lang="ts">
  import type { ProductLabel } from "src/lib/types/product";

  export let label: ProductLabel;
  export let baseUrl: string;
</script>

<img
  src={`${baseUrl}${label.filename}`}
  alt={label.name}
  class="product-label-item"
/>

<style lang="postcss">
  .product-label-item {
    @apply h-4 lg:h-6 ml-1 first:ml-0 lg:ml-0;
  }
</style>
