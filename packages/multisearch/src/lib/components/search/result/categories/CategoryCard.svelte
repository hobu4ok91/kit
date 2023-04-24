<script lang="ts">
  import { addToHistory } from "~/lib/store/history";
  import { searchResult } from "~/lib/store/search";
  import { index } from "~/lib/store/selectable";
  import { SelectCategoryEvent } from "~/lib/events";
  import Btn from "../../../ui/Btn.svelte";

  $: category = $searchResult.categories[$index];

  function onClick() {
    addToHistory(category.name);
    new SelectCategoryEvent().dispatch(category.url);
  }
</script>

<div class="category-card">
  <div class="category-card__content">
    <div class="category-card__img">
      {#key category.img}
        <img src={category.img} alt="" class="mix-blend-multiply" />
      {/key}
    </div>
    <div>
      <div class="text-h3">{category.name}</div>
      <div class="text-neutral mt-1">{category.description}</div>
      <div class="flex items-center mt-4">
        <Btn label="Перейти в группу" href={category.url} on:click={onClick} />
        <div class="text-neutral ml-4">или нажмите Enter</div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .category-card {
    @apply flex items-start justify-center p-6 w-full mt-16;
  }

  .category-card__content {
    @apply flex flex-col items-start w-full bg-hover rounded-3xl p-16;
    max-width: 800px;
  }

  .category-card :global(.btn) {
    @apply h-10 text-primary bg-transparent border border-primary border-solid;
    box-shadow: initial;
  }

  .category-card__img {
    @apply mb-6 flex justify-end items-center;
    height: 150px;
  }

  img {
    @apply max-w-full max-h-full w-auto h-full;
  }
</style>
