<script lang="ts">
  import { createEventDispatcher, onMount, tick } from "svelte";
  import BtnIcon from "../ui/BtnIcon.svelte";
  import Spinner from "../ui/Spinner.svelte";
  import Btn from "../ui/Btn.svelte";
  import { fade } from "svelte/transition";
  import Svg from "../ui/Svg.svelte";
  import { media } from "../../store/media";
  import { laSearchSolid, laTimesSolid } from "./line-awesome";

  export let value: string;
  export let loading: boolean;

  let inputElement: HTMLInputElement;

  const dispatch = createEventDispatcher<{
    close: void;
    blur: void;
    submit: void;
  }>();

  onMount(async () => {
    await tick();

    inputElement?.select();
    inputElement?.focus();
  });

  function onBlur(e: Event) {
    e.stopPropagation();
    inputElement.focus();
    dispatch("blur");
  }

  function onClear() {
    dispatch("close");
  }
</script>

<div class="search-input">
  {#if !$media.desktop}
    <Svg icon={laSearchSolid} class="search-input-icon" />
  {/if}
  <div class="search-input__wrap">
    <input
      type="text"
      bind:this={inputElement}
      bind:value
      on:blur={onBlur}
      on:input
      placeholder="Поиск товаров..."
      class="search-input__input h-14"
    />
    <span class="spinner-wrap">
      {#if loading}
        <Spinner />
      {/if}
    </span>
  </div>
  {#if value}
    <div transition:fade={{ duration: 250 }} class="flex items-center">
      <span class="text-neutral mr-2">
        <BtnIcon on:click={onClear} icon={laTimesSolid} />
      </span>
      {#if $media.desktop}
        <Btn
          label="Найти"
          class="bg-secondary text-white"
          on:click={() => dispatch("submit")}
        />
      {/if}
    </div>
  {/if}
</div>

<style lang="postcss">
  input::placeholder {
    @apply text-neutral focus:text-neutral;
  }

  .search-input {
    @apply w-full bg-white flex justify-center items-center border-b border-neutral-light lg:pr-4 sticky top-0;
    z-index: 4001;
  }

  .search-input__wrap {
    @apply flex w-full relative self-stretch px-4 lg:px-7;
  }

  .search-input__input {
    @apply p-0 m-0 border-none shadow-none outline-none text-xl w-full font-normal;
  }

  .spinner-wrap {
    @apply absolute top-1/2 transform -translate-y-1/2 right-4;
  }

  .search-input :global(.search-input-icon) {
    @apply w-8 h-8 ml-2;
  }
</style>
