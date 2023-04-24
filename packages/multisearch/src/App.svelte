<script lang="ts">
  import Search from "./lib/components/search/Search.svelte";
  import Dialog from "./lib/components/ui/Dialog.svelte";
  import { isShownSearch } from "./lib/store/config";

  function close() {
    isShownSearch.set(false);
  }
</script>

{#if $isShownSearch}
  <Dialog on:close={close}>
    <Search on:close={close} />
  </Dialog>
{/if}
