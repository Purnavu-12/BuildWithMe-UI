<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './tool-call-panel.css';
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
  const payload = JSON.stringify({ query: 'button', engine: 'css', results: 3 }, null, 2);
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="tool-call-panel">
  <div class="bw-panel bw-tool">
    <p class="bw-caption">Local demonstration</p>
    <button type="button" aria-expanded={open} aria-controls={uid} onclick={() => (open = !open)}
      ><span><span class="bw-tool-dot"></span>search_components</span><span>{open ? '−' : '+'}</span
      ></button
    >
    <p class="bw-description">3 matching components found</p>
    {#if open}<pre id={uid}>{payload}</pre>{/if}
  </div>
</div>
