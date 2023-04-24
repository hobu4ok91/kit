<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let once = false;
  export let top = 0;
  export let bottom = 0;
  export let left = 0;
  export let right = 0;

  let intersecting = false;
  let container;

  const dispatch = createEventDispatcher();

  onMount(() => {
    if (typeof IntersectionObserver !== "undefined") {
      const rootMargin = `${top}px ${right}px ${bottom}px ${left}px`;

      const observer = new IntersectionObserver(
        (entries) => {
          intersecting = entries[0].isIntersecting;

          if (intersecting) {
            dispatch("visible");
          } else {
            dispatch("invisible");
          }

          if (intersecting && once) {
            observer.unobserve(container);
          }
        },
        {
          rootMargin,
        }
      );

      observer.observe(container);

      return () => {
        observer.unobserve(container);
      };
    }
  });
</script>

<div bind:this={container} class={$$props.class}>
  <slot {intersecting} />
</div>
