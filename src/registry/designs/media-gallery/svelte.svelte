<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';
  import { galleryImages } from '../../shared/gallery-assets';
  import '../../shared/base.css';
  import './media-gallery.css';
  let { label = 'Media gallery', className = '' }: { label?: string; className?: string } =
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
      false,
    );
    return () => lifecycle.destroy();
  });
  let index = $state(0);
  let dialog: HTMLDialogElement;
  let trigger: HTMLButtonElement;
  const item = $derived(galleryImages[index]);
  function key(e: KeyboardEvent) {
    let next: number;
    if (e.key === 'ArrowRight') next = (index + 1) % 3;
    else if (e.key === 'ArrowLeft') next = (index + 2) % 3;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = 2;
    else return;
    e.preventDefault();
    index = next;
  }
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="media-gallery"
>
  <div class="bwm-gallery">
    <figure aria-label={label}>
      <img src={item.src} alt={item.alt} />
      <figcaption>{item.title} · {index + 1} / 3</figcaption>
    </figure>
    <div class="bwm-row">
      <button
        type="button"
        class="bwm-control"
        aria-label="Previous image"
        onclick={() => (index = (index + 2) % 3)}>←</button
      >{#each galleryImages as image, i (image.title)}<button
          type="button"
          class="bwm-thumb"
          onkeydown={key}
          aria-label={`Show ${image.title}`}
          aria-pressed={i === index}
          onclick={() => (index = i)}><img src={image.src} alt="" /></button
        >{/each}<button
        type="button"
        class="bwm-control"
        aria-label="Next image"
        onclick={() => (index = (index + 1) % 3)}>→</button
      >
    </div>
    <button
      bind:this={trigger}
      type="button"
      class="bwm-control"
      aria-haspopup="dialog"
      onclick={() => dialog.showModal()}>Open image</button
    >
    <dialog
      bind:this={dialog}
      class="bwm-modal"
      aria-labelledby={uid}
      onclose={() => trigger.focus()}
    >
      <h3 id={uid}>{item.title}</h3>
      <img src={item.src} alt={item.alt} />
      <div class="bwm-row">
        <button type="button" class="bwm-control" onclick={() => dialog.close()}>Close image</button
        >
      </div>
    </dialog>
  </div>
</div>
