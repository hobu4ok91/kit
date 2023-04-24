<script lang="ts">
  import { media } from "~/lib/store/media";
  import List from "../../../ui/List.svelte";
  import SuggestionsListItem from "./SuggestionsListItem.svelte";
  import { suggestionsWithDefault } from "~/lib/store/search";
  import { currentItem, Entity, entity, index } from "~/lib/store/selectable";
  import { cachedResponses, loadProducts } from "~/lib/store/products";
  import type { Suggestion } from "../../../../types/suggestion";
  import { addToHistory } from "~/lib/store/history";
  import { SearchEvent } from "~/lib/events";

  $: filteredSuggestions = $media.desktop
    ? $suggestionsWithDefault
    : $suggestionsWithDefault.slice(0, 4);

  $: isActiveSuggestions = $entity === Entity.suggestion;
  $: currentSuggestion = isActiveSuggestions
    ? ($currentItem as Suggestion)
    : null;

  $: if (
    currentSuggestion &&
    !$cachedResponses[currentSuggestion.suggestion] &&
    $index > 0
  ) {
    loadProducts(currentSuggestion.suggestion);
  }

  function onClick(query: string) {
    addToHistory(query);
    new SearchEvent().dispatch(query);
  }
</script>

<List>
  {#each filteredSuggestions as suggestion, idx}
    <SuggestionsListItem
      {suggestion}
      active={isActiveSuggestions && $index === idx}
      on:click={() => onClick(suggestion.suggestion)}
    />
  {/each}
</List>
