<script lang="ts">
  import { history } from "~/lib/store/history";
  import SavedQueriesList from "./saved-queries/SavedQueriesList.svelte";
</script>

{#if $history.length}
  <div class="search-preview">
    <SavedQueriesList hideTitle />
  </div>
{/if}

<style lang="postcss">
  .search-preview {
    @apply py-4 lg:py-6;
  }
</style>
