<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';
  import { animate, createScope, stagger } from 'animejs';
  import '../../shared/base.css';
  import './stagger-reveal.css';
  let { paused = false, text = 'Ideas into interfaces.' }: { paused?: boolean; text?: string } =
    $props();
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
    const value = text;
    const scope = createScope({ root }).add(() => {
      animate('.bw-word', {
        opacity: [0, 1],
        y: [16, 0],
        delay: stagger(110),
        duration: 700,
        ease: 'out(3)',
      });
    });
    void value;
    return () => scope.revert();
  });
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="stagger-reveal">
  <p class="bw-large-text">
    <span class="bw-sr-only">{text}</span>{#each text.split(' ') as word, index (index)}<span
        class="bw-word"
        aria-hidden="true"
        >{word}
      </span>{/each}
  </p>
</div>
