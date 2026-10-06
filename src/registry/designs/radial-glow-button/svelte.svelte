<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/radial-glow-button.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './radial-glow-button.css';
  let {
    label = 'Radial glow button',
    paused = false,
    onClick,
  }: { label?: string; paused?: boolean; onClick?: () => void } = $props();
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
    el.style.setProperty('--rx', `${event.clientX - box.left}px`);
    el.style.setProperty('--ry', `${event.clientY - box.top}px`);
  }
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="radial-glow-button">
  <button type="button" class="adapt-radial" onpointermove={move} onclick={() => onClick?.()}
    ><span>{label}</span><i aria-hidden="true"></i></button
  >
</div>
