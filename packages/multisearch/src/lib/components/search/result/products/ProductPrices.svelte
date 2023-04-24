<script lang="ts">
  import type { Product } from "src/lib/types/product";

  export let product: Product;
</script>

<div class="product-price-wrap">
  <div class="product-price">
    {#if product.count > 1}
      от
    {/if}
    {parseInt(product.costs.cost).toLocaleString()} ₽
  </div>
  {#if product.costs.strikeCost}
    <div class="product-price-strike">
      {parseInt(product.costs.strikeCost).toLocaleString()} ₽
    </div>
  {/if}
</div>

<style lang="postcss">
  .product-price-strike {
    @apply text-neutral text-xs line-through mr-1 lg:mr-0 lg:absolute lg:top-0 lg:left-0;
  }

  .product-price-wrap {
    @apply flex items-center lg:items-start lg:relative lg:flex-col lg:justify-end;
  }

  .product-price {
    @apply text-positive text-h5 lg:mt-4 order-1;
  }

  @screen lg {
    .product-price-wrap {
      height: 42px;
    }
  }
</style>
