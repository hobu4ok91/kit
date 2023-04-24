<script lang="ts">
  import SuggestionsList from "./result/suggestions/SuggestionsList.svelte";
  import NotFound from "./result/problems/NotFound.svelte";
  import CategoriesList from "./result/categories/CategoriesList.svelte";
  import ProductsList from "./result/products/ProductsList.svelte";
  import SavedQueriesList from "./saved-queries/SavedQueriesList.svelte";
  import CategoryCard from "./result/categories/CategoryCard.svelte";
  import { isEmptyResult, searchResult } from "~/lib/store/search";
  import { media } from "~/lib/store/media";
  import { Entity, entity } from "~/lib/store/selectable";

  $: suggestions = $searchResult.suggestions;
  $: products = $searchResult.products;
  $: categories = $searchResult.categories;
</script>

{#if $isEmptyResult}
  <NotFound />
{:else}
  <div class="search-result">
    <div class="search-result_side">
      {#if suggestions.length > 0 || products.length}
        <SuggestionsList />
      {/if}
      {#if categories.length > 0}
        <CategoriesList />
      {/if}
      {#if $media.desktop}
        <SavedQueriesList />
      {/if}
    </div>
    {#if $entity !== Entity.category}
      <ProductsList />
    {:else if $media.desktop}
      <CategoryCard />
    {/if}
  </div>
{/if}

<style lang="postcss">
  .search-result {
    @apply flex flex-col lg:flex-row;
  }

  .search-result_side {
    @apply py-4 lg:py-6 grid grid-cols-1 gap-y-6 overflow-y-auto place-content-start place-items-stretch flex-shrink-0;
  }

  @screen lg {
    .search-result_side {
      @apply border-r-8 border-hover;
      width: 450px;
    }
  }
</style>
