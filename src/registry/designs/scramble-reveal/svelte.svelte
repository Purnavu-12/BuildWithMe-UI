<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';
  import { animate } from 'animejs';
  import '../../shared/base.css';
  import './scramble-reveal.css';
  let { paused = false, text = 'HELLO, BUILDER.' }: { paused?: boolean; text?: string } = $props();
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
    const state = { progress: 0 };
    const animation = animate(state, {
      progress: text.length,
      duration: 1300,
      ease: 'linear',
      onUpdate: () => {
        if (output)
          output.textContent = text
            .split('')
            .map((char, index) =>
              index < state.progress
                ? char
                : '01#/<>'[(index + Math.floor(state.progress * 3)) % 6],
            )
            .join('');
      },
    });
    return () => {
      animation.revert();
      if (output) output.textContent = text;
    };
  });
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="scramble-reveal">
  <p class="bw-scramble">
    <span class="bw-sr-only">{text}</span><span bind:this={output} aria-hidden="true">{text}</span>
  </p>
</div>
