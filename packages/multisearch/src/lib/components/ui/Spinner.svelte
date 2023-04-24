<span class="spinner">
  <span class="spinner__inner" />
</span>

<style lang="postcss">
  .spinner {
    @apply flex w-6 h-6;
    animation: bubble 0.6s ease-in-out infinite both;
  }

  .spinner__inner {
    @apply relative inline-flex rounded-full w-6 h-6 bg-yellow-500;
  }

  @keyframes bubble {
    0%,
    100% {
      transform: scale(0.66);
    }

    50% {
      transform: scale(1);
    }
  }
</style>
