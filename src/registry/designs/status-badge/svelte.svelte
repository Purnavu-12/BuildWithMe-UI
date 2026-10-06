<!-- Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/ui/badge.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './status-badge.css';
  let { label = 'Status badge', paused = false }: { label?: string; paused?: boolean } = $props();
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

<div bind:this={root} class="bw-demo" data-active={active} data-component="status-badge">
  <div class="adapt-status" role="status">
    <i aria-hidden="true"></i><span>{label}</span><small>Operational · demo</small>
  </div>
</div>
