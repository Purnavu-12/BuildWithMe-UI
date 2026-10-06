<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/flip-text.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './flip-text.css';
  let { label = 'Flip text', paused = false }: { label?: string; paused?: boolean } = $props();
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

<div bind:this={root} class="bw-demo" data-active={active} data-component="flip-text">
  <p class="adapt-flip" aria-label={label}>
    {#each label.split('') as letter, index (index)}<span
        aria-hidden="true"
        style:animation-delay={`${index * 45}ms`}>{letter === ' ' ? ' ' : letter}</span
      >{/each}
  </p>
</div>
