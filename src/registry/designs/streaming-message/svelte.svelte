<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './streaming-message.css';
  let {
    paused = false,
    text = 'Great things are built together. Start with a small idea, add a little care, and share what you learn.',
  }: { paused?: boolean; text?: string } = $props();
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
  let length = $state(0);
  $effect(() => {
    void text;
    length = 0;
  });
  $effect(() => {
    if (!active) return;
    const count = text.length;
    const timer = setInterval(() => {
      length = Math.min(length + 2, count);
      if (length === count) clearInterval(timer);
    }, 45);
    return () => clearInterval(timer);
  });
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="streaming-message">
  <div class="bw-panel bw-message">
    <p class="bw-caption">An idea, taking shape</p>
    <p class="bw-description">
      <span class="bw-sr-only">{text}</span><span aria-hidden="true"
        >{reduced ? text : text.slice(0, length)}<span class="bw-caret"></span></span
      >
    </p>
  </div>
</div>
