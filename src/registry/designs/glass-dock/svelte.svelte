<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/glass-dock.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './glass-dock.css';
  let { label = 'Glass dock', paused = false }: { label?: string; paused?: boolean } = $props();
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
  let selected = $state('Home');
  const items = ['Home', 'Search', 'Create', 'Profile'];
  const icons = ['⌂', '⌕', '＋', '◉'];
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="glass-dock">
  <div>
    <nav class="adapt-dock" aria-label={label}>
      {#each items as item, i (item)}<button
          type="button"
          aria-label={item}
          aria-pressed={selected === item}
          onclick={() => (selected = item)}><span aria-hidden="true">{icons[i]}</span></button
        >{/each}
    </nav>
    <p class="bw-caption" role="status">{selected} selected</p>
  </div>
</div>
