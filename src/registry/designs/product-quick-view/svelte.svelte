<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';
  import { galleryImages } from '../../shared/gallery-assets';
  import '../../shared/base.css';
  import './product-quick-view.css';
  let { label = 'Product quick view', className = '' }: { label?: string; className?: string } =
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
  let dialog: HTMLDialogElement;
  let trigger: HTMLButtonElement;
  let size = $state('Medium');
  let added = $state(false);
  const image = galleryImages[0];
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="product-quick-view"
>
  <button
    bind:this={trigger}
    type="button"
    class="bwm-control"
    aria-haspopup="dialog"
    onclick={() => dialog.showModal()}>Open {label}</button
  >
  <dialog
    bind:this={dialog}
    class="bwm-modal"
    aria-labelledby={uid}
    onclose={() => trigger.focus()}
  >
    <img src={image.src} alt={image.alt} />
    <h3 id={uid}>{label}</h3>
    <p>Signal object · $48 · local demonstration</p>
    <fieldset>
      <legend>Size</legend>
      <div class="bwm-row">
        {#each ['Small', 'Medium', 'Large'] as option (option)}<label
            ><input
              type="radio"
              name={uid}
              value={option}
              bind:group={size}
              onchange={() => (added = false)}
            />{option}</label
          >{/each}
      </div>
    </fieldset>
    <div class="bwm-row">
      <button type="button" class="bwm-control" onclick={() => (added = true)}
        >Add to selection</button
      ><button type="button" class="bwm-control" onclick={() => dialog.close()}
        >Close quick view</button
      >
    </div>
    <p role="status">{added ? `${size} Signal object added locally. No order placed.` : ''}</p>
  </dialog>
</div>
