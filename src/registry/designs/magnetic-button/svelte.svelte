<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './magnetic-button.css';
  let {
    paused = false,
    label = 'Pull me closer',
    onClick,
  }: { paused?: boolean; label?: string; onClick?: () => void } = $props();
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
  let point = $state({ x: 0, y: 0 });
  function move(event: PointerEvent) {
    if (!active) return;
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    point = {
      x: (event.clientX - bounds.left - bounds.width / 2) * 0.22,
      y: (event.clientY - bounds.top - bounds.height / 2) * 0.22,
    };
  }
  $effect(() => {
    if (!active) point = { x: 0, y: 0 };
  });
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="magnetic-button">
  <button
    type="button"
    class="bw-button bw-magnetic"
    style:transform={`translate(${point.x}px, ${point.y}px)`}
    onpointermove={move}
    onpointerleave={() => (point = { x: 0, y: 0 })}
    onclick={() => onClick?.()}>{label}<span aria-hidden="true"> ↗</span></button
  >
</div>
