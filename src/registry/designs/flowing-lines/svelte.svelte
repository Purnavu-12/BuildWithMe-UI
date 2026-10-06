<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';
  import { animate, createScope, stagger } from 'animejs';
  import '../../shared/base.css';
  import './flowing-lines.css';
  let { paused = false }: { paused?: boolean } = $props();
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
  $effect(() => {
    if (!active || !root) return;
    const scope = createScope({ root }).add(() => {
      animate('.bw-flow-line', {
        scaleY: [0.25, 1, 0.25],
        opacity: [0.2, 0.8, 0.2],
        duration: 2600,
        delay: stagger(130),
        loop: true,
        ease: 'inOutSine',
      });
    });
    return () => scope.revert();
  });
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="flowing-lines">
  <div class="bw-flow" aria-hidden="true">
    {#each Array.from({ length: 15 }) as _, i (i)}<span
        class="bw-flow-line"
        style:height={`${70 + Math.sin(i * 0.45) * 65}px`}
      ></span>{/each}
  </div>
</div>
