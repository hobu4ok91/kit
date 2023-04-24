<script lang="ts">
  import SavedQueriesList from "../../saved-queries/SavedQueriesList.svelte";

  export let title: string;
  export let description: string;
</script>

<div class="problem-block">
  <div class="flex items-center">
    <slot name="icon" />
    <div class="ml-4">
      <div class="text-h3">{title}</div>
      <div class="text-neutral">
        {description}
      </div>
    </div>
  </div>
  <div class="pb-10">
    <div class="mt-7 mb-4 text-xl">
      <slot />
    </div>
    <slot name="after" />
  </div>
</div>

<SavedQueriesList startIndex={0} class="pt-4 pb-10" />

<style lang="postcss">
  .problem-block {
    @apply px-4 py-4 lg:px-12 lg:pt-12;
  }
</style>
