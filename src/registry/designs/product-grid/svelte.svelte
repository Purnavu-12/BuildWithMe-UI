<!-- Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/product-grid.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';
  import { galleryImages } from '../../shared/gallery-assets';
  import '../../shared/base.css';
  import './product-grid.css';
  let { label = 'Product grid', paused = false }: { label?: string; paused?: boolean } = $props();
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
  let selected = $state('');
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="product-grid">
  <div>
    <div class="adapt-products" aria-label={label}>
      {#each galleryImages as item, index (item.title)}<button
          type="button"
          aria-pressed={selected === item.title}
          onclick={() => (selected = item.title)}
          ><img src={item.src} alt={item.alt} /><span
            ><b>{item.title}</b><small>${[89, 240, 64][index]}</small></span
          ></button
        >{/each}
    </div>
    <p class="bw-caption" role="status">
      {selected ? `${selected} selected locally.` : 'Example objects · no checkout'}
    </p>
  </div>
</div>
