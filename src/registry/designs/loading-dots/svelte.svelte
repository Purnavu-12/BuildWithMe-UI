<!-- Adapted from https://github.com/vercel/examples/blob/main/internal/packages/ui/src/loading-dots.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './loading-dots.css';
  let { label = 'Loading dots', paused = false }: { label?: string; paused?: boolean } = $props();
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
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="loading-dots">
  <span class="adapt-loading" role="status"
    ><span class="bw-sr-only">{label}</span><i></i><i></i><i></i></span
  >
</div>
