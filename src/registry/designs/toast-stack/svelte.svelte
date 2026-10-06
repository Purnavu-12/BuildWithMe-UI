<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './toast-stack.css';
  let { label = 'Toast stack', className = '' }: { label?: string; className?: string } = $props();
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
  let toasts = $state<{ id: number; remaining: number }[]>([]);
  let timeoutPaused = $state(false);
  let counter = 0;
  $effect(() => {
    if (timeoutPaused) return;
    const timer = setInterval(
      () =>
        (toasts =
          document.hidden || !toasts.length
            ? toasts
            : toasts
                .map((item) => ({ ...item, remaining: item.remaining - 250 }))
                .filter((item) => item.remaining > 0)),
      250,
    );
    return () => clearInterval(timer);
  });
  function add() {
    toasts = [...toasts.slice(-2), { id: ++counter, remaining: 6000 }];
  }
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="toast-stack"
>
  <div class="bwm-panel">
    <h3>{label}</h3>
    <div class="bwm-row">
      <button type="button" onclick={add}>Add notification</button><button
        type="button"
        aria-pressed={timeoutPaused}
        onclick={() => (timeoutPaused = !timeoutPaused)}
        >{timeoutPaused ? 'Resume timeouts' : 'Pause timeouts'}</button
      >
    </div>
    <div class="bwm-toasts" role="status" aria-live="polite" aria-relevant="additions">
      {#each toasts as item (item.id)}<div class="bwm-toast">
          <span>Source saved · {item.id}</span><button
            type="button"
            aria-label={`Dismiss notification ${item.id}`}
            onclick={() => (toasts = toasts.filter((toast) => toast.id !== item.id))}>×</button
          >
        </div>{/each}
    </div>
    <small>Notifications expire after six seconds. Pause keeps them available.</small>
  </div>
</div>
