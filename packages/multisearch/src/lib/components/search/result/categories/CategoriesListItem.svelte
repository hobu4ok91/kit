<script lang="ts">
  import ListItem from "../../../ui/ListItem.svelte";
  import type { Category } from "src/lib/types/category";

  export let category: Category;
  export let active: boolean;
</script>

<ListItem
  {active}
  href={category.url}
  image={category.img}
  class="js-category_link"
  on:click
>
  <div class="pb-1 truncate">{category.name}</div>
  <div class="text-neutral truncate">
    {category.description}
  </div>
</ListItem>
