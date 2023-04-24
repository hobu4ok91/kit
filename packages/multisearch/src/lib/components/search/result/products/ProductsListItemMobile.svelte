<script lang="ts">
  import ListItem from "../../../ui/ListItem.svelte";
  import type { Product } from "src/lib/types/product";
  import ProductPrices from "./ProductPrices.svelte";
  import ProductLabels from "./ProductLabels.svelte";

  export let product: Product;
</script>

<ListItem index={0} image={product.img} href={product.url} on:click>
  <div class="mb-1">{product.name}</div>
  {#if product.labels?.length}
    <div class="mb-1">
      <ProductLabels labels={product.labels} />
    </div>
  {/if}
  {#if product.costs}
    <ProductPrices {product} />
  {/if}
</ListItem>
