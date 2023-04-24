<script lang="ts" context="module">
  export const DIALOG_CONTEXT = Symbol("dialog");

  export interface DialogContext {
    getElement: () => HTMLElement;
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onMount, setContext } from "svelte";
  import { fade } from "svelte/transition";
  import { lock, unlock } from "tua-body-scroll-lock";
  import { onEsc, portal } from "./dialog";
  import { MediaState, media } from "../../store/media";
  import { desktopOffset } from "../../store/dialog";

  let contentElement: HTMLElement;
  let windowInnerHeight = 0;
  let mounted = false;

  $: maxHeight = $media.desktop ? windowInnerHeight - 86 : windowInnerHeight;
  $: desktopStyle = getDesktopStyle($media, $desktopOffset);

  const dispatch = createEventDispatcher();

  setContext(DIALOG_CONTEXT, {
    getElement: () => contentElement,
  });

  onMount(() => {
    lock(contentElement);

    mounted = true;

    return () => unlock(contentElement);
  });

  function getDesktopStyle(media: MediaState, offset: number): string {
    const top = media.desktop ? offset : 0;

    return `padding-top: ${top}px`;
  }

  function close() {
    if (!mounted) {
      return;
    }

    dispatch("close");
  }
</script>

<svelte:window bind:innerHeight={windowInnerHeight} on:keydown={onEsc(close)} />

<!-- svelte-ignore a11y-no-click -->
<div
  use:portal
  class="search-dialog-wrapper"
  style="height: {maxHeight}px; {desktopStyle}"
>
  <div
    on:click={close}
    transition:fade={{ duration: 250 }}
    class="bg-black opacity-40 fixed inset-0 cursor-pointer lg:cursor-default"
  />
  <div
    bind:this={contentElement}
    class="search-dialog"
    style="max-height: {maxHeight}px"
    transition:fade={{ duration: 250 }}
  >
    <slot />
  </div>
</div>

<style lang="postcss">
  .search-dialog-wrapper {
    @apply fixed inset-0 flex flex-col justify-start items-center lg:p-7;
    z-index: 3000;
  }

  .search-dialog {
    @apply lg:rounded-lg w-full overflow-auto relative lg:shadow-xl pb-20 lg:pb-0 lg:bg-white;
    -webkit-overflow-scrolling: touch;
    max-width: 1320px;
  }

  @screen 2xl {
    .search-dialog {
      max-width: 1410px;
    }
  }
</style>
