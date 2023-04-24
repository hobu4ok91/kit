<script lang="ts">
  import ProductsListItem from "./ProductsListItem.svelte";
  import ProductsListItemMobile from "./ProductsListItemMobile.svelte";
  import { media } from "~/lib/store/media";
  import { query } from "~/lib/store/search";
  import List from "../../../ui/List.svelte";
  import MoreProducts from "./MoreProducts.svelte";
  import type { ProductsResult } from "~/lib/store/products";
  import { productsResult } from "~/lib/store/products";
  import { addToHistory } from "~/lib/store/history";

  let previousFilledResult: ProductsResult | null = null;

  $: products = getProducts($productsResult);
  $: filteredProducts = $media.desktop ? products : products.slice(0, 3);

  $: if ($productsResult.products.length) {
    previousFilledResult = { ...$productsResult };
  }

  function getProducts(result: ProductsResult) {
    if (result.products.length) {
      return result.products;
    } else if (previousFilledResult?.products?.length) {
      return previousFilledResult.products;
    }

    return [];
  }
</script>

<div class="flex-grow flex flex-col justify-between">
  <div class="products-wrapper">
    {#if $media.desktop}
      {#if products.length > 0 && $query}
        <div class="font-semibold mb-10">
          <div class="text-h5 text-neutral">товары по запросу</div>
          <div class="text-h3">{$productsResult.expression}</div>
        </div>
      {/if}
      <div class="search-products">
        {#each products as product (product.sku)}
          <ProductsListItem
            {product}
            on:click={() => addToHistory(product.name)}
          />
        {/each}
      </div>
    {:else}
      <List title="Товары">
        <div class="grid max-w-full gap-y-1 grid-cols-1 pb-4">
          {#each filteredProducts as product (product.sku)}
            <ProductsListItemMobile {product} />
          {/each}
        </div>
      </List>
    {/if}
  </div>
  {#if $productsResult.hasMore && !$media.desktop}
    <MoreProducts />
  {/if}
</div>

<style lang="postcss">
  .search-products {
    @apply grid gap-y-4;
  }

  @screen lg {
    .search-products {
      @apply gap-x-6 gap-y-8;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    }
    .products-wrapper {
      @apply flex-grow p-6;
    }
  }

  @screen xl {
    .products-wrapper {
      @apply p-12;
    }
  }
</style>
