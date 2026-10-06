<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './spotlight-card.css';
  let { paused = false, children }: { paused?: boolean; children?: Snippet } = $props();
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
  function move(event: PointerEvent) {
    if (!active) return;
    const el = event.currentTarget as HTMLElement;
    const box = el.getBoundingClientRect();
    el.style.setProperty('--x', `${event.clientX - box.left}px`);
    el.style.setProperty('--y', `${event.clientY - box.top}px`);
  }
  function reset(event: PointerEvent) {
    const el = event.currentTarget as HTMLElement;
    el.style.setProperty('--x', '50%');
    el.style.setProperty('--y', '50%');
  }
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="spotlight-card">
  <div class="bw-panel bw-spotlight" role="group" onpointermove={move} onpointerleave={reset}>
    {#if children}{@render children()}{:else}<p class="bw-caption">A little unexpected</p>
      <h3 class="bw-title">Follow your curiosity.</h3>
      <p class="bw-description">The best ideas start with a little exploration.</p>{/if}
  </div>
</div>
