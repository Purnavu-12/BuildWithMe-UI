<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './tilt-card.css';
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
    el.style.transform = `perspective(800px) rotateX(${-(event.clientY - box.top - box.height / 2) / 14}deg) rotateY(${(event.clientX - box.left - box.width / 2) / 14}deg)`;
  }
  function reset(event: PointerEvent) {
    const el = event.currentTarget as HTMLElement;
    el.style.transform = 'none';
  }
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="tilt-card">
  <div class="bw-panel bw-tilt" role="group" onpointermove={move} onpointerleave={reset}>
    {#if children}{@render children()}{:else}<p class="bw-caption">A new perspective</p>
      <div class="bw-tilt-orbit" aria-hidden="true"></div>
      <h3 class="bw-title">More than a surface.</h3>{/if}
  </div>
</div>
