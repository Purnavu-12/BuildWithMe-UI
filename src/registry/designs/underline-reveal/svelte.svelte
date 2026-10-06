<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './underline-reveal.css';
  let { paused = false, text = 'Make your mark.' }: { paused?: boolean; text?: string } = $props();
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

<div bind:this={root} class="bw-demo" data-active={active} data-component="underline-reveal">
  <p class="bw-large-text bw-underline">{text}</p>
</div>
