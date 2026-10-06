<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';
  import { animate } from 'animejs';
  import '../../shared/base.css';
  import './count-up.css';
  let { paused = false, value = 2048.0 }: { paused?: boolean; value?: number } = $props();
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
  let output: HTMLSpanElement;
  $effect(() => {
    if (!active || !output) return;
    const state = { value: 0 };
    const animation = animate(state, {
      value: value,
      duration: 1800,
      ease: 'out(4)',
      onUpdate: () => {
        if (output) output.textContent = Math.round(state.value).toLocaleString('en-US');
      },
    });
    return () => {
      animation.revert();
      if (output) output.textContent = value.toLocaleString('en-US');
    };
  });
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="count-up">
  <p class="bw-counter">
    <span class="bw-sr-only">{value}</span><span bind:this={output} aria-hidden="true"
      >{value.toLocaleString('en-US')}</span
    ><span aria-hidden="true">+</span>
  </p>
</div>
