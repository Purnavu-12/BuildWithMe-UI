<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/kinetic-text-loader.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './kinetic-text-loader.css';
  let { label = 'Kinetic text loader', paused = false }: { label?: string; paused?: boolean } =
    $props();
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

<div bind:this={root} class="bw-demo" data-active={active} data-component="kinetic-text-loader">
  <div class="adapt-kinetic" role="status" aria-label={label}>
    <span aria-hidden="true">BUILD · SHIP · REMIX · </span><span aria-hidden="true"
      >SOURCE · OPEN · YOURS ·
    </span>
  </div>
</div>
