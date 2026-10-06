<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './rotating-words.css';
  let {
    paused = false,
    words = ['beautiful.', 'accessible.', 'yours.'],
  }: { paused?: boolean; words?: string[] } = $props();
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
  let index = $state(0);
  const current = $derived(words[index % words.length] ?? 'yours.');
  $effect(() => {
    if (!active || !words.length) return;
    const count = words.length;
    const timer = setInterval(() => (index = (index + 1) % count), 2400);
    return () => clearInterval(timer);
  });
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="rotating-words">
  <p class="bw-large-text">
    Build it<br /><span class="bw-sr-only">{words.join(' ') || 'yours.'}</span><span
      class="bw-rotating"
      aria-hidden="true">{current}</span
    >
  </p>
</div>
