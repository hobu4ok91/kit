<script lang="ts">
  import { createSearchUrl } from "../../search";
  import ListItem from "../../../ui/ListItem.svelte";
  import type { Suggestion } from "src/lib/types/suggestion";

  export let suggestion: Suggestion;
  export let active: boolean;
</script>

<ListItem
  {active}
  href={createSearchUrl(suggestion.suggestion)}
  class="js-category_link"
  on:click
>
  <span class="suggestion-text">{@html suggestion.highlight}</span>
</ListItem>

<style lang="postcss">
  .suggestion-text :global(b) {
    @apply font-normal text-primary;
  }
</style>
