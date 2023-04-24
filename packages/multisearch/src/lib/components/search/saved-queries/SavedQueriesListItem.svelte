<script lang="ts">
  import { createSearchUrl } from "../search";
  import ListItem from "../../ui/ListItem.svelte";
  import Svg from "../../ui/Svg.svelte";
  import { laHistorySolid } from "../../ui/line-awesome";

  export let query: string;
  export let active: boolean;
</script>

<ListItem
  href={createSearchUrl(query)}
  {active}
  class="js-category_link"
  on:click
>
  <div class="flex items-center">
    <span class="mr-4 text-neutral">
      <Svg icon={laHistorySolid} />
    </span>
    <span>{query}</span>
  </div>
</ListItem>
