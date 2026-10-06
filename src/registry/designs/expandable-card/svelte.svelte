<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './expandable-card.css';
  let { paused = false }: { paused?: boolean } = $props();
  let root: HTMLDivElement;
  let active = $state(false);
  let reduced = $state(true);
  const uid = $props.id();
  $effect(() => {
    if (!root) return;
    const lifecycle = observeMotion(
      root,
      (state) => {
        active = state.active;
        reduced = state.reduced;
      },
      paused,
    );
    return () => lifecycle.destroy();
  });
  let open = $state(false);
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="expandable-card">
  <div class="bw-panel">
    <p class="bw-caption">Field notes · 001</p>
    <h3 class="bw-title">Less, but better.</h3>
    <button
      type="button"
      class="bw-expand-toggle"
      aria-expanded={open}
      aria-controls={uid}
      onclick={() => (open = !open)}>{open ? 'Close the story −' : 'Read the story +'}</button
    >{#if open}<p id={uid} class="bw-description">
        Start with the essentials. Give every element a purpose, every interaction a little care,
        and every idea room to breathe.
      </p>{/if}
  </div>
</div>
