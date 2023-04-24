<script lang="ts">
  import { currentItem, entity, Entity, index } from "~/lib/store/selectable";
  import type { Category } from "../../types/category";
  import { debounce } from "ts-debounce";
  import { query, searchResult } from "~/lib/store/search";
  import BaseSearchInput from "../ui/BaseSearchInput.svelte";
  import type { Suggestion } from "src/lib/types/suggestion";
  import { createEventDispatcher, onMount } from "svelte";
  import { media } from "~/lib/store/media";
  import { BlurEvent } from "~/lib/events";
  import { search as apiSearch } from "~/lib/api/search";

  let inputValue = $query;
  let loading = false;

  $: updateInputValue($entity, $index);

  onMount(() => {
    if (inputValue) {
      setQuery(inputValue);
    }
  });

  const dispatch = createEventDispatcher();

  const onInput = (e: Event & { target: HTMLInputElement }) => {
    $query = e.target.value.trim();

    debouncedSetQuery(e);
  };

  function onBlur() {
    new BlurEvent().dispatch(inputValue);
  }

  const debouncedSetQuery = debounce(
    (e: Event & { target: HTMLInputElement }) => {
      setQuery(e.target.value);
    },
    300
  );

  function setQuery(value: string) {
    const trimmed = value.trim();

    query.set(trimmed);
    entity.set(Entity.suggestion);
    index.set(null);

    if (!trimmed) {
      searchResult.set(null);

      return;
    }

    setTimeout(async () => await search(trimmed));
  }

  function onClose() {
    inputValue = "";

    if ($media.desktop) {
      setQuery("");
    } else {
      dispatch("close");
    }
  }

  async function search(query: string) {
    loading = true;
    searchResult.set(await apiSearch(query));
    loading = false;
  }

  function updateInputValue(entity: Entity, index: number | null) {
    if (index === null) {
      return;
    }

    if (entity === Entity.suggestion) {
      inputValue = ($currentItem as Suggestion).suggestion;
    } else if (entity === Entity.history) {
      inputValue = $currentItem as string;
    } else if (entity === Entity.category) {
      inputValue = ($currentItem as Category).name;
    }
  }
</script>

<BaseSearchInput
  bind:value={inputValue}
  {loading}
  on:close={onClose}
  on:input={onInput}
  on:submit
  on:blur={onBlur}
/>
