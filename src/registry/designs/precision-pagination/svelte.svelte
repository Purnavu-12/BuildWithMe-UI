<!-- Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/ui/pagination.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './precision-pagination.css';
  let { label = 'Precision pagination', paused = false }: { label?: string; paused?: boolean } =
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
  let page = $state(2);
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="precision-pagination">
  <nav class="adapt-pagination" aria-label={label}>
    <button type="button" aria-label="Previous page" disabled={page === 1} onclick={() => page--}
      >←</button
    >{#each [1, 2, 3, 4] as n (n)}<button
        type="button"
        aria-current={page === n ? 'page' : undefined}
        onclick={() => (page = n)}>{n}</button
      >{/each}<button
      type="button"
      aria-label="Next page"
      disabled={page === 4}
      onclick={() => page++}>→</button
    >
  </nav>
</div>
