<script lang="ts">
  import List from "../../../ui/List.svelte";
  import CategoriesListItem from "./CategoriesListItem.svelte";
  import { media } from "~/lib/store/media";
  import { searchResult } from "~/lib/store/search";
  import { entity, Entity, index } from "~/lib/store/selectable";
  import { addToHistory } from "~/lib/store/history";
  import { SelectCategoryEvent } from "~/lib/events";
  import type { Category } from "~/lib/types/category";

  $: categories = $searchResult.categories;
  $: filteredCategories = $media.desktop ? categories : categories.slice(0, 3);
  $: isActiveSuggestions = $entity === Entity.category;

  function onClick(category: Category) {
    addToHistory(category.name);
    new SelectCategoryEvent().dispatch(category.url);
  }
</script>

<List title="Категории">
  <div class="grid max-w-full gap-y-1 grid-cols-1">
    {#each filteredCategories as category, idx (category.url)}
      <CategoriesListItem
        {category}
        active={isActiveSuggestions && $index === idx}
        on:click={() => onClick(category)}
      />
    {/each}
  </div>
</List>
