<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/wave-grid-background.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './wave-grid-background.css';
  let { label = 'Wave grid background', paused = false }: { label?: string; paused?: boolean } =
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

<div bind:this={root} class="bw-demo" data-active={active} data-component="wave-grid-background">
  <div class="adapt-wave" role="img" aria-label={label}>
    {#each Array.from({ length: 35 }) as _, index (index)}<i
        style:animation-delay={`${(index % 7) * 55 + Math.floor(index / 7) * 40}ms`}
      ></i>{/each}
  </div>
</div>
