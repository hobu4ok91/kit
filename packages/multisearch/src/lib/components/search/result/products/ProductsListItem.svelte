<script lang="ts">
  import type { Product } from "src/lib/types/product";
  import Image from "../../../ui/Image.svelte";
  import ProductLabels from "./ProductLabels.svelte";
  import ProductPrices from "./ProductPrices.svelte";

  export let product: Product;
</script>

<div class="product-item">
  <div class="pb-4 flex justify-center items-end ite h-32 relative">
    <Image src={product.img} />
  </div>
  {#if product.costs}
    <ProductPrices {product} />
  {/if}
  <div class="line-clamp-3 mt-2">{product.name}</div>
  <a href={product.url} on:click class="product-item-link">
    {product.name}
  </a>
  {#if product.labels?.length}
    <ProductLabels labels={product.labels} />
  {/if}
</div>

<style lang="postcss">
  .product-item {
    @apply flex flex-col transition-shadow hover:shadow-xl duration-300 cursor-pointer p-4 rounded-md relative;
  }

  .product-item-link {
    @apply absolute opacity-0 inset-0;
  }
</style>
