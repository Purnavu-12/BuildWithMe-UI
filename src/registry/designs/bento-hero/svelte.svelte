<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';
  import { galleryImages } from '../../shared/gallery-assets';
  import '../../shared/base.css';
  import './bento-hero.css';
  let { label = 'Bento hero', className = '' }: { label?: string; className?: string } = $props();
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
      false,
    );
    return () => lifecycle.destroy();
  });
  let selected = $state(false);
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="bento-hero"
>
  <div class="bwm-bento">
    <article class="bwm-panel">
      <small>BUILDWITHME / UI</small>
      <h3>{label}</h3>
      <p>Build the interface.<br />Keep the source.</p>
      <button type="button" aria-pressed={selected} onclick={() => (selected = !selected)}
        >{selected ? 'Added to your canvas ✓' : 'Start a canvas ↗'}</button
      >
    </article>
    <figure>
      <img src={galleryImages[0].src} alt={galleryImages[0].alt} />
      <figcaption>01 / Signal</figcaption>
    </figure>
    <aside class="bwm-panel">
      <strong>3 runtimes.</strong><span>One idea. Your framework.</span>
    </aside>
  </div>
</div>
