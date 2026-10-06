<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './dialog-sheet.css';
  let { className = '', label = 'Dialog sheet' }: { label?: string } = $props();
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
</script>

<div
  bind:this={root}
  class={`bw-demo ${className}`}
  data-active={active}
  data-component="dialog-sheet"
>
  <button
    bind:this={trigger}
    type="button"
    class="bwm-dialog-sheet__trigger"
    aria-haspopup="dialog"
    onclick={() => dialog.showModal()}>Open {label}</button
  >
  <dialog
    bind:this={dialog}
    class="bwm-dialog-sheet__dialog"
    aria-labelledby={uid}
    onclose={() => trigger.focus()}
  >
    <div class="bwm-dialog-sheet__panel">
      <p class="bwm-dialog-sheet__eyebrow">Overlay / adaptive</p>
      <h2 id={uid}>{label}</h2>
      <p class="bwm-dialog-sheet__copy">
        Keep the current task in view while reviewing the next building block.
      </p>
      <button type="button" class="bwm-dialog-sheet__close" onclick={() => dialog.close()}
        >Close {label}</button
      >
    </div>
  </dialog>
</div>
