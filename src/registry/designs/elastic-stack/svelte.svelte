<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/elastic-stack.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './elastic-stack.css';
  let { label = 'Elastic stack', paused = false }: { label?: string; paused?: boolean } = $props();
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
  let selected = $state('Plan');
  const items = ['Plan', 'Build', 'Review', 'Ship'];
  const icons = ['01', '02', '03', '04'];
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="elastic-stack">
  <div>
    <nav class="adapt-elastic" aria-label={label}>
      {#each items as item, i (item)}<button
          type="button"
          aria-label={item}
          aria-pressed={selected === item}
          onclick={() => (selected = item)}
          ><span aria-hidden="true">{icons[i]}</span><b>{item}</b></button
        >{/each}
    </nav>
    <p class="bw-caption" role="status">{selected} selected</p>
  </div>
</div>
