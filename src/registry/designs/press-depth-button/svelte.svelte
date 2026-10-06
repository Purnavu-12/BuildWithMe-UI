<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './press-depth-button.css';
  let {
    paused = false,
    label = 'Give it a push',
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
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="press-depth-button">
  <button type="button" class="bw-button bw-depth" onclick={() => onClick?.()}
    ><span>{label}</span></button
  >
</div>
