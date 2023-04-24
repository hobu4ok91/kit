<script lang="ts">
  import { Entity, entity, onKeyPress } from "~/lib/store/selectable";
  import { hasServerError, searchResult } from "~/lib/store/search";
  import ServerError from "./result/problems/ServerError.svelte";
  import SearchInput from "./SearchInput.svelte";
  import SearchResult from "./SearchResult.svelte";
  import { productsResult } from "~/lib/store/products";
  import { media } from "~/lib/store/media";
  import MoreProducts from "./result/products/MoreProducts.svelte";
  import SearchPreview from "./SearchPreview.svelte";
  import { onMount } from "svelte";
  import { on } from "delegated-events";
  import { isPreventedLinks } from "~/lib/store/config";
  import { submit } from "~/lib/store/submit";

  onMount(() => {
    if ($isPreventedLinks) {
      on("click", "a.js-category_link", (e) => {
        e.preventDefault();
      });
    }
  });

  function onKey(event: KeyboardEvent) {
    $onKeyPress(event);

    if (event.code === "Enter") {
      $submit();
    }
  }
</script>

<svelte:window on:keydown={onKey} />

<div class="lg:bg-white">
  <SearchInput on:close on:submit={() => $submit()} />
  <div class="bg-white rounded-b-2xl lg:rounded-lg overflow-hidden relative">
    {#if $hasServerError}
      <ServerError />
    {:else if $searchResult}
      <SearchResult />
    {:else}
      <SearchPreview />
    {/if}
  </div>
</div>
{#if $productsResult.hasMore && $media.desktop && $entity !== Entity.category}
  <MoreProducts />
{/if}
