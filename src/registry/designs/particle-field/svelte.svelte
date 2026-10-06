<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';
  import { animate, createScope, stagger } from 'animejs';
  import '../../shared/base.css';
  import './particle-field.css';
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
      animate('.bw-particle', {
        y: [-8, 8],
        opacity: [0.2, 0.9],
        duration: 2400,
        delay: stagger(80),
        alternate: true,
        loop: true,
        ease: 'inOutSine',
      });
    });
    return () => scope.revert();
  });
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="particle-field">
  <div class="bw-particles" aria-hidden="true">
    {#each Array.from({ length: 30 }) as _, i (i)}<span
        class="bw-particle"
        style:left={`${(i * 37 + 11) % 100}%`}
        style:top={`${(i * 53 + 7) % 100}%`}
        style:width={`${(i % 3) + 2}px`}
        style:height={`${(i % 3) + 2}px`}
      ></span>{/each}
  </div>
</div>
