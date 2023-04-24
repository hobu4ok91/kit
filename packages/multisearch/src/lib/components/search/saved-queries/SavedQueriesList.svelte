<script lang="ts">
  import { currentItem, Entity, entity, index } from "~/lib/store/selectable";
  import { clearHistory, history } from "~/lib/store/history";
  import Btn from "../../ui/Btn.svelte";
  import List from "../../ui/List.svelte";
  import SavedQueriesListItem from "./SavedQueriesListItem.svelte";
  import { cachedResponses, loadProducts } from "~/lib/store/products";
  import { suggestionsWithDefault } from "~/lib/store/search";
  import { SearchEvent } from "~/lib/events";

  export let hideTitle = false;

  $: isActiveHistory = $entity === Entity.history;
  $: currentQuery = isActiveHistory ? ($currentItem as string) : null;

  $: if (
    $suggestionsWithDefault.length &&
    currentQuery &&
    !$cachedResponses[currentQuery]
  ) {
    loadProducts(currentQuery);
  }

  function dispatchSearch(query: string) {
    new SearchEvent().dispatch(query);
  }
</script>

{#if $history.length}
  <div class={$$props.class}>
    <List title={hideTitle ? "" : "Вы искали ранее"}>
      {#each $history as query, idx (query)}
        <SavedQueriesListItem
          {query}
          active={isActiveHistory && $index === idx}
          on:click={() => dispatchSearch(query)}
        />
      {/each}
    </List>
    <div class="text-neutral pl-6 pt-2">
      <Btn label="Очистить историю" on:click={clearHistory} />
    </div>
  </div>
{/if}
