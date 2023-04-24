<script lang="ts">
  let className = "";
  export { className as class };
  export let label: string;
  export let href: string | undefined = undefined;
</script>

<svelte:element
  this={href ? "a" : "button"}
  class="btn {className}"
  {href}
  on:click
>
  {label}
</svelte:element>
