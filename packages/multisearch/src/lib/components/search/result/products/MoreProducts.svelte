<script lang="ts">
  import { productsResult } from "~/lib/store/products";
  import { createSearchUrl } from "../../search";
  import { SearchEvent } from "~/lib/events";

  function dispatchSearch(query: string) {
    new SearchEvent().dispatch(query);
  }
</script>

<a
  href={createSearchUrl($productsResult.expression)}
  class="more-products-wrap js-category_link"
  on:click={() => dispatchSearch($productsResult.expression)}
>
  <span class="text-primary text-xl block">
    Показать другие товары по запросу
  </span>
  <span class="text-neutral">{$productsResult.expression}</span>
</a>

<style lang="postcss">
  .more-products-wrap {
    @apply flex flex-col items-center text-center justify-start py-4 bg-hover no-underline;
  }

  @screen lg {
    .more-products-wrap {
      @apply sticky bottom-0;
      margin-left: 442px;
    }
  }
</style>
