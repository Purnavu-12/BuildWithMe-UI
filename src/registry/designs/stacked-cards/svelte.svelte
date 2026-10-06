<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './stacked-cards.css';
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
  let index = $state(0);
  const ideas = ['Start something.', 'Make it useful.', 'Share the source.'];
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="stacked-cards">
  <div class="bw-stack">
    <span class="bw-stack-back" aria-hidden="true"></span><button
      type="button"
      class="bw-panel bw-stack-front"
      aria-label={`${ideas[index]} Shuffle cards`}
      onclick={() => (index = (index + 1) % ideas.length)}
      ><span class="bw-caption">IDEA 0{index + 1} / 03</span><span class="bw-title"
        >{ideas[index]}</span
      ><span class="bw-description">Click to shuffle ↗</span></button
    >
  </div>
</div>
